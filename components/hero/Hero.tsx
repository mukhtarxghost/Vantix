"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";
import { LM_EASE } from "@/lib/motion";
import HeroVisual from "@/components/hero/HeroVisual";

const pipeline = [
  "ACQUIRE",
  "CONVERT",
  "MANAGE",
  "RETAIN",
  "GROW",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useLayoutEffect(() => {
    if (!heroRef.current || reducedMotion) return;

    const hero = heroRef.current;
    const ctx = gsap.context(() => {
      const visual = hero.querySelector<HTMLElement>(".h-visual");
      const eyebrow = hero.querySelector<HTMLElement>(".h-eyebrow");
      const lines = hero.querySelectorAll<HTMLElement>(".h-line");
      const copy = hero.querySelector<HTMLElement>(".h-copy");
      const buttons = hero.querySelectorAll<HTMLElement>(".h-btn");
      const pipelineEl = hero.querySelector<HTMLElement>(".h-pipeline");

      gsap.set(visual, { opacity: 0, scale: 1.05 });
      gsap.set(eyebrow, { y: 18, opacity: 0 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(copy, { y: 20, opacity: 0 });
      gsap.set(buttons, { y: 18, opacity: 0 });
      gsap.set(pipelineEl, { y: 14, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.25, defaults: { ease: LM_EASE.out } });

      tl.to(visual, { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }, 0);
      tl.to(eyebrow, { y: 0, opacity: 1, duration: 0.7 }, 0.25);
      tl.to(lines, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.38);
      tl.to(copy, { y: 0, opacity: 1, duration: 0.8 }, 0.68);
      tl.to(buttons, { y: 0, opacity: 1, stagger: 0.09, duration: 0.7 }, 0.8);
      tl.to(pipelineEl, { y: 0, opacity: 1, duration: 0.8 }, 1.0);
    }, hero);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[var(--background)]"
    >
      {/* ─── 3D MARQUEE WALL — the living ecosystem, full bleed ─── */}
      <div className="h-visual absolute inset-0 z-[1] will-change-transform">
        <HeroVisual className="h-full w-full rounded-none" />
      </div>

      {/* Scrims — keep the message readable above the wall */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[38%] bg-gradient-to-r from-[var(--background)] via-[var(--background)]/55 to-transparent lg:w-[30%]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[20%] bg-gradient-to-t from-[var(--background)] via-[var(--background)]/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[12%] bg-gradient-to-b from-[var(--background)]/80 to-transparent" />

      {/* ─── CONTENT — pointer-events pass through so the wall stays hoverable ─── */}
      <div className="pointer-events-none relative z-[3] flex h-full items-center">
        <div className="container w-full pb-24 pt-28 lg:pb-0 lg:pt-0">
          <div className="max-w-[760px]">
            {/* Eyebrow */}
            <div className="h-eyebrow mb-8 flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-30" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="mono-label text-white/40">Customer Growth Platform</span>
            </div>

            {/* Headline — masked line reveal */}
            <h1 className="display-1 text-white">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="h-line block will-change-transform">Turn attention</span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span className="h-line block will-change-transform">into customers<span className="text-[var(--accent)]">.</span></span>
              </span>
            </h1>

            {/* Copy — the whole system in two sentences */}
            <p className="h-copy mt-8 max-w-[500px] text-[14px] leading-[1.75] text-white/45 lg:text-[15px]">
              Vantix creates the attention, converts it into customers, and
              manages every relationship that follows — content, campaigns,
              AI conversations, CRM, and automated follow-up in one system.
            </p>

            {/* Buttons */}
            <div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/book"
                className="h-btn chamfer-button inline-flex items-center gap-2.5 bg-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-black transition-all hover:bg-[var(--accent)]"
              >
                Build your growth system
                <ArrowUpRight size={12} strokeWidth={2.5} />
              </Link>
              <a
                href="#acquire"
                className="h-btn inline-flex items-center gap-2 border border-white/[0.14] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40 transition-colors hover:border-white/30 hover:text-white"
              >
                See how it works
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PIPELINE STRIP — bottom hairline row ─── */}
      <div className="absolute inset-x-0 bottom-0 z-[4]">
        <div className="container">
          <div className="h-pipeline flex items-center justify-between gap-x-2 border-t border-white/[0.07] py-5 md:justify-start md:gap-x-0">
            {pipeline.map((stage, i) => (
              <div key={stage} className="flex items-center">
                <a
                  href={`#${stage === "ACQUIRE" ? "acquire" : stage === "CONVERT" ? "convert" : stage === "MANAGE" ? "manage" : stage === "RETAIN" ? "automation" : "system"}`}
                  className={`mono-label px-2 text-white/25 transition-colors duration-300 hover:text-white/70 md:px-6 ${
                    i === pipeline.length - 1 ? "text-[var(--accent)]/70 hover:text-[var(--accent)]" : ""
                  }`}
                >
                  {stage}
                </a>
                {i < pipeline.length - 1 && (
                  <span className="hidden text-white/[0.12] md:block">→</span>
                )}
              </div>
            ))}
            <span className="mono-label hidden pl-8 text-white/[0.12] lg:block">
              One system, end to end
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
