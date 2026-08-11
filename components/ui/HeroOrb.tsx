"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cursorStore } from "@/lib/cursorStore";
import { useMotion } from "@/components/system/MotionContext";

type HeroOrbProps = {
  className?: string;
  children?: ReactNode;
};

type Particle = { x: number; y: number; z: number; vx: number; vy: number; size: number };
type Blip = { angle: number; radius: number; speed: number; size: number };
type Shockwave = { born: number; speed: number };

export default function HeroOrb({ className = "", children }: HeroOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const parallax = parallaxRef.current;
    if (!canvas || !wrap || !parallax) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    let parX = 0;
    let parY = 0;
    let targetParX = 0;
    let targetParY = 0;

    const particles: Particle[] = Array.from({ length: 56 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.00007,
      vy: (Math.random() - 0.5) * 0.00005,
      size: Math.random() * 1.8 + 0.3,
    }));

    const blips: Blip[] = Array.from({ length: 11 }, (_, i) => ({
      angle: (i / 11) * Math.PI * 2,
      radius: 0.38 + (i % 4) * 0.16,
      speed: 0.1 + (i % 5) * 0.035,
      size: 1.5 + (i % 3) * 0.8,
    }));

    const shockwaves: Shockwave[] = [];

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawLightColumn = (cx: number) => {
      const col = ctx.createLinearGradient(cx - w * 0.2, 0, cx + w * 0.2, 0);
      col.addColorStop(0, "rgba(255,255,255,0)");
      col.addColorStop(0.38, "rgba(255,255,255,0.04)");
      col.addColorStop(0.5, "rgba(255,255,255,0.11)");
      col.addColorStop(0.62, "rgba(255,255,255,0.04)");
      col.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = col;
      ctx.fillRect(0, 0, w, h);

      const core = ctx.createLinearGradient(cx - w * 0.035, 0, cx + w * 0.035, 0);
      core.addColorStop(0, "rgba(255,255,255,0)");
      core.addColorStop(0.5, "rgba(255,255,255,0.07)");
      core.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);
    };

    const drawFloorGrid = (cx: number, horizon: number) => {
      const rows = 16;
      for (let i = 0; i <= rows; i++) {
        const p = i / rows;
        const y = horizon + Math.pow(p, 1.55) * (h - horizon);
        const spread = 0.06 + p * 0.94;
        ctx.beginPath();
        ctx.moveTo(cx - w * spread, y);
        ctx.lineTo(cx + w * spread, y);
        ctx.strokeStyle = `rgba(255,255,255,${0.025 + p * 0.08})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = -18; i <= 18; i++) {
        if (i === 0) continue;
        ctx.beginPath();
        ctx.moveTo(cx, horizon);
        ctx.lineTo(cx + i * w * 0.055, h + 10);
        ctx.strokeStyle = `rgba(255,255,255,${0.02 + Math.abs(i / 18) * 0.05})`;
        ctx.stroke();
      }
    };

    const drawParticles = (cx: number, cy: number) => {
      particles.forEach((p) => {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
        }
        const px = p.x * w;
        const py = p.y * h;
        const dist = Math.hypot(px - cx, py - cy);
        const alpha = Math.max(0, 0.4 - dist / (w * 0.5)) * (0.12 + p.z * 0.55);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });
    };

    const drawRadar = (cx: number, cy: number, baseR: number) => {
      const squash = 0.36;

      const glowPulse = 0.88 + Math.sin(t * 1.05) * 0.12;
      const glow = ctx.createRadialGradient(cx, cy, baseR * 0.01, cx, cy, baseR * 1.25 * glowPulse);
      glow.addColorStop(0, `rgba(255,255,255,${0.32 + Math.sin(t * 1.4) * 0.06})`);
      glow.addColorStop(0.22, "rgba(255,255,255,0.14)");
      glow.addColorStop(0.5, "rgba(255,255,255,0.04)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cx - baseR * 1.35, cy - baseR * 0.75, baseR * 2.7, baseR * 1.5);

      shockwaves.forEach((wave) => {
        const age = t - wave.born;
        const r = age * wave.speed;
        const alpha = Math.max(0, 0.4 - age * 0.5);
        if (alpha <= 0) return;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * squash, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      if (!reducedMotion && Math.random() < 0.01) {
        shockwaves.push({ born: t, speed: baseR * 0.6 });
      }
      while (shockwaves.length > 5) shockwaves.shift();
      while (shockwaves.length && t - shockwaves[0].born > 1.1) shockwaves.shift();

      const ringRadii = [0.2, 0.34, 0.48, 0.62, 0.76, 0.9, 1.04];
      const ringOpacity = [0.58, 0.45, 0.36, 0.28, 0.22, 0.16, 0.11];

      ringRadii.forEach((ratio, i) => {
        const pulse = 1 + Math.sin(t * 1.05 + i * 0.65) * 0.018;
        ctx.beginPath();
        ctx.ellipse(cx, cy, baseR * ratio * pulse, baseR * ratio * squash * pulse, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${ringOpacity[i] + Math.sin(t * 0.85 + i) * 0.05})`;
        ctx.lineWidth = i < 2 ? 1.5 : 1;
        ctx.stroke();
      });

      const sweepAngle = t * 1.15;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(sweepAngle);
      ctx.scale(1, squash);
      const wedge = ctx.createRadialGradient(0, 0, 0, 0, 0, baseR * 1.08);
      wedge.addColorStop(0, "rgba(255,255,255,0.16)");
      wedge.addColorStop(0.5, "rgba(255,255,255,0.05)");
      wedge.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = wedge;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, baseR * 1.08, -0.42, 0.42);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(baseR * 1.08, 0);
      ctx.stroke();
      ctx.restore();

      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * (0.3 + i * 0.08) * (i % 2 === 0 ? 1 : -1));
        ctx.scale(1, squash);
        ctx.beginPath();
        ctx.arc(0, 0, baseR * (0.42 + i * 0.22), 0, Math.PI * 0.58);
        ctx.strokeStyle = `rgba(255,255,255,${0.16 + i * 0.05})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.restore();
      }

      blips.forEach((blip, i) => {
        if (reducedMotion) return;
        blip.angle += blip.speed * 0.018;
        const bx = cx + Math.cos(blip.angle) * baseR * blip.radius;
        const by = cy + Math.sin(blip.angle) * baseR * blip.radius * squash;
        ctx.beginPath();
        ctx.arc(bx, by, blip.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.55 + Math.sin(t * 2.2 + i) * 0.35})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(bx, by, blip.size + 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${0.08 + Math.sin(t + i) * 0.05})`;
        ctx.stroke();
      });

      const cross = baseR * 0.16;
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.beginPath();
      ctx.moveTo(cx - cross, cy);
      ctx.lineTo(cx + cross, cy);
      ctx.moveTo(cx, cy - cross * squash);
      ctx.lineTo(cx, cy + cross * squash);
      ctx.stroke();

      const dotPulse = 1 + Math.sin(t * 2.3) * 0.14;
      ctx.beginPath();
      ctx.arc(cx, cy, 5.5 * dotPulse, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 18 + Math.sin(t * 2.3) * 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.11 + Math.sin(t * 2.3) * 0.06})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 32 + Math.sin(t * 1.5) * 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawHudBrackets = () => {
      const pad = 16;
      const len = 32;
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.lineWidth = 1;
      const corners = [
        [pad, pad + len, pad, pad, pad + len, pad],
        [w - pad, pad + len, w - pad, pad, w - pad - len, pad],
        [pad, h - pad - len, pad, h - pad, pad + len, h - pad],
        [w - pad, h - pad - len, w - pad, h - pad, w - pad - len, h - pad],
      ];
      corners.forEach(([x1, y1, x2, y2, x3, y3]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();
      });
    };

    const draw = (now: number) => {
      t = now * 0.001;
      const cx = w / 2;
      const cy = h * 0.46;
      const baseR = Math.min(w * 0.42, h * 0.38);
      const horizon = h * 0.68;

      ctx.clearRect(0, 0, w, h);
      drawLightColumn(cx);
      drawFloorGrid(cx, horizon);
      drawParticles(cx, cy);
      drawRadar(cx, cy, baseR);
      drawHudBrackets();

      if (!reducedMotion) {
        const { x: mx, y: my } = cursorStore.get();
        if (mx > 0) {
          targetParX = (mx / window.innerWidth - 0.5) * 18;
          targetParY = (my / window.innerHeight - 0.5) * 12;
        } else {
          targetParX = Math.sin(t * 0.4) * 8;
          targetParY = Math.sin(t * 0.55) * 5;
        }
        parX += (targetParX - parX) * 0.06;
        parY += (targetParY - parY) * 0.06;
        const floatY = Math.sin(t * 0.65) * 5;
        parallax.style.transform = `translate3d(${parX}px, ${floatY + parY * 0.3}px, 0) rotateX(${parY * 0.08}deg) rotateY(${parX * 0.12}deg)`;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className={`hero-radar-stage ${className}`} aria-hidden="true">
      <div ref={parallaxRef} className="hero-radar-parallax">
        <canvas ref={canvasRef} className="hero-radar-canvas" />
        {children && <div className="hero-ring-label">{children}</div>}
      </div>
      <div className="hero-radar-hud">
        <span className="hero-radar-hud-item hero-radar-hud-tl">SYS.ONLINE</span>
        <span className="hero-radar-hud-item hero-radar-hud-tr">NODES 847</span>
        <span className="hero-radar-hud-item hero-radar-hud-bl">LATENCY 12ms</span>
        <span className="hero-radar-hud-item hero-radar-hud-br">SYNC ACTIVE</span>
      </div>
    </div>
  );
}
