"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type DitheringMode = "bayer" | "halftone" | "noise" | "crosshatch";
type ColorMode = "original" | "grayscale" | "duotone" | "custom";

interface DitherShaderProps {
  src: string;
  gridSize?: number;
  ditherMode?: DitheringMode;
  colorMode?: ColorMode;
  invert?: boolean;
  pixelRatio?: number;
  primaryColor?: string;
  secondaryColor?: string;
  /** Accent color used for green-dominant regions when preserveGreen is on */
  tertiaryColor?: string;
  /** Keep the artwork's green regions green instead of collapsing them to black/white */
  preserveGreen?: boolean;
  customPalette?: string[];
  brightness?: number;
  contrast?: number;
  backgroundColor?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  threshold?: number;
  animated?: boolean;
  animationSpeed?: number;
  shimmer?: boolean;
  shimmerIntensity?: number;
  className?: string;
}

const BAYER_4 = new Uint8Array([0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]);
const BAYER_8 = new Uint8Array([
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
]);

const INTERNAL_SCALE = 0.55;
const FRAME_COUNT = 8;

/** Green-dominance threshold: g - max(r, b) above this counts as the artwork's green zone */
const GREEN_MASK = 30;
/** Dither center for green regions — lower = reads more green, higher = more black */
const GREEN_CENTER = 0.28;
const GREEN_SPREAD = 0.3;

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function parseHex(color: string): [number, number, number] {
  if (color.startsWith("#")) {
    const h = color.slice(1);
    if (h.length === 3)
      return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  return [0, 0, 0];
}

/** Deterministic per-pixel hash — used to spatially vary the shimmer */
function pixelHash(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * DitherShader — optimized hero-scale canvas dithering with living shimmer.
 *
 * Performance strategy:
 *  - Source image preprocessed once at reduced internal resolution (0.38x).
 *  - FRAME_COUNT dithered frames are PRE-BAKED once (varying threshold +
 *    per-pixel noise), so the animation loop only issues drawImage calls
 *    with an alpha cross-fade — there is NO per-pixel work per frame.
 *  - 30fps cap with frame-skipping.
 *  - Reduced-motion users get a single static frame.
 */
export const DitherShader: React.FC<DitherShaderProps> = ({
  src,
  gridSize = 4,
  ditherMode = "bayer",
  colorMode = "grayscale",
  invert = false,
  pixelRatio = 1,
  primaryColor = "#000000",
  secondaryColor = "#ffffff",
  tertiaryColor = "#34d399",
  preserveGreen = false,
  brightness = 0,
  contrast = 1,
  backgroundColor = "transparent",
  objectFit = "cover",
  threshold = 0.5,
  animated = false,
  animationSpeed = 0.02,
  shimmer = true,
  shimmerIntensity = 0.06,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const baseFrameRef = useRef<HTMLCanvasElement | null>(null);
  const internalRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [imageReady, setImageReady] = useState(false);

  const parsedPrimary = useRef([0, 0, 0]);
  const parsedSecondary = useRef([255, 255, 255]);
  const parsedTertiary = useRef([52, 211, 153]);
  const greenMaskRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    parsedPrimary.current = parseHex(primaryColor);
    parsedSecondary.current = parseHex(secondaryColor);
    parsedTertiary.current = parseHex(tertiaryColor);
  }, [primaryColor, secondaryColor, tertiaryColor]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        if (width > 0 && height > 0) setDims({ w: width, h: height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** Bake a single dithered frame into an offscreen canvas at internal res. */
  const bakeFrame = useCallback(
    (
      lum: Float32Array,
      rgb: Uint8Array,
      intW: number,
      intH: number,
      k: number,
      useShimmer: boolean,
    ): HTMLCanvasElement => {
      const canvas = document.createElement("canvas");
      canvas.width = intW;
      canvas.height = intH;
      const octx = canvas.getContext("2d")!;
      const imgData = octx.createImageData(intW, intH);
      const out = imgData.data;

      const isBayer = ditherMode === "bayer";
      const matSize = isBayer ? (gridSize <= 4 ? 4 : 8) : 0;
      const bayer = isBayer ? (gridSize <= 4 ? BAYER_4 : BAYER_8) : null;
      const matScale = matSize === 4 ? 16 : 64;
      const effPixel = Math.max(1, Math.floor(gridSize * pixelRatio));
      const pri = parsedPrimary.current;
      const sec = parsedSecondary.current;
      const kPhase = (k / (FRAME_COUNT - 1) - 0.5) * 2; // -1 .. 1

      for (let y = 0; y < intH; y += effPixel) {
        for (let x = 0; x < intW; x += effPixel) {
          const idx = y * intW + x;
          const lumVal = lum[idx];

          let dt: number;
          if (isBayer && bayer) {
            const mx = Math.floor(x / gridSize) % matSize;
            const my = Math.floor(y / gridSize) % matSize;
            dt = bayer[my * matSize + mx] / matScale;
          } else if (ditherMode === "halftone") {
            const sc = gridSize * 2;
            const a = Math.PI / 4;
            const rx = x * Math.cos(a) + y * Math.sin(a);
            const ry = -x * Math.sin(a) + y * Math.cos(a);
            dt = (Math.sin(rx / sc) + Math.sin(ry / sc) + 2) / 4;
          } else if (ditherMode === "noise") {
            dt = pixelHash(x, y);
          } else {
            const line1 = (x + y) % (gridSize * 2) < gridSize ? 1 : 0;
            const line2 = (x - y + gridSize * 4) % (gridSize * 2) < gridSize ? 1 : 0;
            dt = (line1 + line2) / 2;
          }

          // Living shimmer: per-pixel hash variance + per-frame phase
          let dtShift = 0;
          if (useShimmer) {
            const spatial = (pixelHash(x, y) * 2 - 1) * shimmerIntensity;
            const phase = kPhase * shimmerIntensity * 0.8;
            dtShift = spatial + phase;
          }
          dt = clamp(dt * (1 - threshold) + threshold * 0.5 + dtShift, 0, 1);

          let r: number, g: number, b: number;

          if (preserveGreen && greenMaskRef.current?.[idx]) {
            // Green zone — dithered between the dark base and the green accent,
            // so the artwork's growth regions keep their color and grain
            const dtGreen = clamp(GREEN_CENTER + (dt - 0.5) * GREEN_SPREAD + dtShift, 0, 1);
            const isGreen = lumVal >= dtGreen;
            const tri = parsedTertiary.current;
            if (isGreen) { r = tri[0]; g = tri[1]; b = tri[2]; }
            else { r = pri[0]; g = pri[1]; b = pri[2]; }
          } else if (colorMode === "grayscale") {
            const dark = lumVal < dt;
            r = g = b = dark ? 0 : 255;
          } else if (colorMode === "duotone" || colorMode === "custom") {
            const dark = lumVal < dt;
            r = dark ? pri[0] : sec[0];
            g = dark ? pri[1] : sec[1];
            b = dark ? pri[2] : sec[2];
          } else {
            if (rgb) {
              const ri = idx * 3;
              const dAmt = dt - 0.5;
              const lv = 8;
              r = Math.round(clamp(rgb[ri] + dAmt * 40, 0, 255) / (255 / lv)) * (255 / lv);
              g = Math.round(clamp(rgb[ri + 1] + dAmt * 40, 0, 255) / (255 / lv)) * (255 / lv);
              b = Math.round(clamp(rgb[ri + 2] + dAmt * 40, 0, 255) / (255 / lv)) * (255 / lv);
            } else {
              const dAmt = dt - 0.5;
              const lv = 4;
              r = Math.round(clamp(lumVal * 255 + dAmt * 64, 0, 255) / (255 / lv)) * (255 / lv);
              g = r;
              b = r;
            }
          }

          if (invert) { r = 255 - r; g = 255 - g; b = 255 - b; }

          for (let py = y; py < Math.min(y + effPixel, intH); py++) {
            for (let px = x; px < Math.min(x + effPixel, intW); px++) {
              const oi = (py * intW + px) * 4;
              out[oi] = r;
              out[oi + 1] = g;
              out[oi + 2] = b;
              out[oi + 3] = 255;
            }
          }
        }
      }

      octx.putImageData(imgData, 0, 0);
      return canvas;
    },
    [ditherMode, gridSize, pixelRatio, threshold, colorMode, invert, shimmerIntensity, preserveGreen],
  );

  const preprocess = useCallback(
    (img: HTMLImageElement) => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const dw = dims.w;
      const dh = dims.h;
      if (dw === 0 || dh === 0) return;

      const intW = Math.max(1, Math.floor(dw * INTERNAL_SCALE));
      const intH = Math.max(1, Math.floor(dh * INTERNAL_SCALE));
      internalRef.current = { w: intW, h: intH };

      const off = document.createElement("canvas");
      off.width = intW;
      off.height = intH;
      const octx = off.getContext("2d")!;
      if (!octx) return;

      if (backgroundColor !== "transparent") {
        octx.fillStyle = backgroundColor;
        octx.fillRect(0, 0, intW, intH);
      }

      let sx = 0, sy = 0, sw = intW, sh = intH;
      if (objectFit === "cover") {
        const s = Math.max(intW / iw, intH / ih);
        sw = Math.ceil(iw * s);
        sh = Math.ceil(ih * s);
        sx = Math.floor((intW - sw) / 2);
        sy = Math.floor((intH - sh) / 2);
      } else if (objectFit === "contain") {
        const s = Math.min(intW / iw, intH / ih);
        sw = Math.ceil(iw * s);
        sh = Math.ceil(ih * s);
        sx = Math.floor((intW - sw) / 2);
        sy = Math.floor((intH - sh) / 2);
      }
      octx.drawImage(img, sx, sy, sw, sh);

      const imgData = octx.getImageData(0, 0, intW, intH);
      const px = imgData.data;

      const lum = new Float32Array(intW * intH);
      const rgb = new Uint8Array(intW * intH * 3);
      for (let i = 0, j = 0; i < px.length; i += 4, j++) {
        let r = px[i], g = px[i + 1], b = px[i + 2];
        r = clamp(((r / 255 - 0.5) * contrast + 0.5) * 255 + brightness * 255, 0, 255);
        g = clamp(((g / 255 - 0.5) * contrast + 0.5) * 255 + brightness * 255, 0, 255);
        b = clamp(((b / 255 - 0.5) * contrast + 0.5) * 255 + brightness * 255, 0, 255);
        lum[j] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        rgb[j * 3] = Math.round(r);
        rgb[j * 3 + 1] = Math.round(g);
        rgb[j * 3 + 2] = Math.round(b);
      }

      // Green-dominant regions — preserved so the artwork's growth zone
      // keeps its green accent through the dither
      const greenMask = new Uint8Array(intW * intH);
      for (let i = 0, j = 0; i < px.length; i += 4, j++) {
        const r = px[i], g = px[i + 1], b = px[i + 2];
        greenMask[j] = g - Math.max(r, b) > GREEN_MASK ? 1 : 0;
      }
      greenMaskRef.current = greenMask;

      // Bake the static frame (no shimmer) + FRAME_COUNT shimmer frames — one time only
      baseFrameRef.current = bakeFrame(lum, rgb, intW, intH, 0, false);
      framesRef.current = [];
      for (let k = 0; k < FRAME_COUNT; k++) {
        framesRef.current.push(bakeFrame(lum, rgb, intW, intH, k, shimmer));
      }
      setImageReady(true);
    },
    [dims.w, dims.h, objectFit, brightness, contrast, backgroundColor, bakeFrame, shimmer],
  );

  useEffect(() => {
    if (dims.w === 0) return;
    setImageReady(false);
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (!cancelled) preprocess(img);
    };
    return () => { cancelled = true; };
  }, [src, dims.w, dims.h, preprocess]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dims.w === 0 || dims.h === 0) return;

    const intW = internalRef.current.w;
    const intH = internalRef.current.h;
    const base = baseFrameRef.current;
    if (intW === 0 || intH === 0 || !base) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(dims.w * dpr);
    canvas.height = Math.floor(dims.h * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    const drawFrame = (frame: HTMLCanvasElement, alpha: number) => {
      if (alpha <= 0) return;
      ctx!.globalAlpha = alpha;
      ctx!.drawImage(frame, 0, 0, dims.w, dims.h);
    };

    const paint = (bg: string | null) => {
      if (bg) {
        ctx!.fillStyle = bg;
        ctx!.fillRect(0, 0, dims.w, dims.h);
      } else {
        ctx!.clearRect(0, 0, dims.w, dims.h);
      }
    };

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = animated || (shimmer && !prefersReduced);
    const bg = backgroundColor !== "transparent" ? backgroundColor : null;

    // Static initial render — always show the clean base frame first
    paint(bg);
    drawFrame(base, 1);

    if (!animate) return;

    const frames = framesRef.current;
    if (frames.length < 2) return;

    let lastFrame = 0;
    const TARGET_INTERVAL = 1000 / 30; // 30fps cap

    // Pre-prime so the first animated frame is deterministic
    let start = performance.now();
    const tick = (now: number) => {
      if (now - lastFrame < TARGET_INTERVAL) {
        animRef.current = requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;
      timeRef.current += animationSpeed;

      // Map accumulated time to a smooth cycle through the baked frames
      const f = timeRef.current * FRAME_COUNT;
      const i = Math.floor(f) % FRAME_COUNT;
      const t = f - Math.floor(f);

      paint(bg);
      drawFrame(frames[i], 1 - t);
      drawFrame(frames[(i + 1) % FRAME_COUNT], t);

      animRef.current = requestAnimationFrame(tick);
      start = now;
    };
    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [dims.w, dims.h, animated, shimmer, animationSpeed, backgroundColor, imageReady]);

  return (
    <div ref={containerRef} className={cn("relative h-full w-full", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ imageRendering: "pixelated" }}
        aria-label="Dithered image"
        role="img"
      />
    </div>
  );
};

export default DitherShader;