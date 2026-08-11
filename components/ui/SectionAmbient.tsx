"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

type SectionAmbientProps = {
  position?: "left" | "right" | "center";
  size?: "sm" | "md" | "lg";
  showRing?: boolean;
  label?: string;
  cycleLabels?: string[];
};

export default function SectionAmbient({
  position = "right",
  size = "md",
  showRing = false,
  label,
  cycleLabels,
}: SectionAmbientProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { reducedMotion } = useMotion();

  const sizeClass =
    size === "sm"
      ? "h-[min(28vw,280px)] w-[min(28vw,280px)]"
      : size === "lg"
        ? "h-[min(50vw,520px)] w-[min(50vw,520px)]"
        : "h-[min(38vw,400px)] w-[min(38vw,400px)]";

  const positionClass =
    position === "left"
      ? "left-[-10%] top-[6%]"
      : position === "center"
        ? "left-1/2 top-[12%] -translate-x-1/2"
        : "right-[-8%] top-[6%]";

  useEffect(() => {
    const glow = glowRef.current;
    const ring = ringRef.current;
    if (!glow || reducedMotion) return;

    gsap.fromTo(
      glow,
      { opacity: 0, scale: 0.88 },
      { opacity: 0.32, scale: 1, duration: 1.4, ease: "power2.out" }
    );

    gsap.to(glow, {
      opacity: 0.48,
      scale: 1.05,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.4,
    });

    if (ring) {
      gsap.fromTo(
        ring,
        { opacity: 0, scale: 0.9, rotate: -6 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.6, ease: "power3.out", delay: 0.1 }
      );
      gsap.to(ring, {
        rotate: 360,
        duration: 52,
        repeat: -1,
        ease: "none",
      });
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!cycleLabels?.length || !labelRef.current || reducedMotion) return;

    let index = 0;
    const el = labelRef.current;

    const cycle = () => {
      index = (index + 1) % cycleLabels.length;
      gsap.to(el, {
        opacity: 0,
        y: -5,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          el.textContent = cycleLabels[index];
          gsap.fromTo(
            el,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
          );
        },
      });
    };

    const timer = setInterval(cycle, 3200);
    return () => clearInterval(timer);
  }, [cycleLabels, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className={`section-ambient pointer-events-none absolute hidden md:block ${positionClass}`}
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className={`section-ambient-glow rounded-full ${sizeClass}`}
      />

      {showRing && (
        <div ref={ringRef} className={`section-ambient-ring absolute inset-0 ${sizeClass}`}>
          <svg viewBox="0 0 420 420" className="h-full w-full">
            <circle
              cx="210"
              cy="210"
              r="188"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            <circle
              className="section-ring-trace"
              cx="210"
              cy="210"
              r="188"
              fill="none"
              stroke="rgba(255,255,255,0.11)"
              strokeWidth="1"
              strokeDasharray="120 1060"
              strokeLinecap="round"
            />
          </svg>

          {(label || cycleLabels?.length) && (
            <div className="section-ring-label">
              <span className="section-ring-label-kicker">Status</span>
              <span ref={labelRef} className="section-ring-label-word">
                {label ?? cycleLabels?.[0] ?? "ONLINE"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
