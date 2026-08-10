"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!headingRef.current) return;

    const lines = headingRef.current.querySelectorAll(".hero-line");

    const ctx = gsap.context(() => {
      gsap.set(lines, {
        y: 90,
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      });

      gsap.to(lines, {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        clearProps: "transform,opacity,clipPath",
      });
    }, headingRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-white/10 px-5 pb-8 pt-28 md:px-8 md:pb-10">
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[140px]" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-[1600px] flex-col justify-end">
        {/* Technical header */}
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Vantix / Automation Solutions
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            19.04° N / 72.88° E
          </span>
        </div>

        {/* Main heading */}
        <div className="max-w-[1200px]">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
            Intelligent systems for modern business
          </p>

          <div
            ref={headingRef}
            className="text-[clamp(3.8rem,9.5vw,9.5rem)] font-medium leading-[0.78] tracking-[-0.075em]"
          >
            <div className="hero-line">WE BUILD</div>

            <div className="hero-line text-white/35">
              SYSTEMS
            </div>

            <div className="hero-line">
              THAT WORK.
            </div>
          </div>
        </div>

        {/* Bottom information */}
        <div className="mt-8 flex flex-col justify-between gap-8 border-t border-white/10 pt-6 md:flex-row md:items-end">
          <p className="max-w-md text-sm leading-6 text-white/45">
            Vantix designs and deploys intelligent automation systems that
            eliminate repetitive work and keep businesses moving.
          </p>

          <a
            href="/contact"
            className="group flex w-fit items-center gap-4 text-xs uppercase tracking-[0.16em]"
          >
            <span className="border-b border-white pb-2">
              Start a project
            </span>

            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}