"use client";

import { useEffect, useRef } from "react";
import { cursorStore } from "@/lib/cursorStore";
import { useMotion } from "@/components/system/MotionContext";

type HeroOrbProps = {
  className?: string;
};

export default function HeroOrb({ className = "" }: HeroOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = 0;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      size = Math.min(rect.width, rect.height);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      t = now * 0.001;
      const cx = size / 2;
      const cy = size / 2;
      const baseR = size * 0.38;

      const { x: mx, y: my } = cursorStore.get();
      let parX = 0;
      let parY = 0;
      if (mx > 0) {
        parX = ((mx / window.innerWidth - 0.5) * size) / 40;
        parY = ((my / window.innerHeight - 0.5) * size) / 40;
      }

      ctx.clearRect(0, 0, size, size);

      const glow = ctx.createRadialGradient(
        cx + parX,
        cy + parY,
        baseR * 0.1,
        cx + parX,
        cy + parY,
        baseR * 1.15
      );
      glow.addColorStop(0, "rgba(255,255,255,0.09)");
      glow.addColorStop(0.45, "rgba(255,255,255,0.03)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      for (let i = 0; i < 3; i++) {
        const pulse = 0.85 + Math.sin(t * 0.9 + i * 1.4) * 0.06;
        const r = baseR * pulse * (0.72 + i * 0.14);
        ctx.beginPath();
        ctx.arc(cx + parX * 0.5, cy + parY * 0.5, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${0.04 + i * 0.025})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 0; i < 4; i++) {
        const rot = t * (0.25 + i * 0.08) * (i % 2 === 0 ? 1 : -1);
        const arcR = baseR * (0.55 + i * 0.08);
        ctx.save();
        ctx.translate(cx + parX * 0.3, cy + parY * 0.3);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.arc(0, 0, arcR, 0, Math.PI * 1.15);
        ctx.strokeStyle = `rgba(255,255,255,${0.08 + i * 0.03})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.restore();
      }

      const breathe = 0.92 + Math.sin(t * 1.1) * 0.04;
      ctx.beginPath();
      ctx.arc(cx + parX * 0.2, cy + parY * 0.2, baseR * 0.12 * breathe, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className={`hero-orb-wrap ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="hero-orb-canvas" />
    </div>
  );
}
