"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";
import { useSectionActive } from "@/hooks/useSectionActive";
import SectionAmbient from "@/components/ui/SectionAmbient";
import StatCounter from "@/components/ui/StatCounter";

const stats = [
  {
    value: "24/7",
    label: "AVAILABILITY",
  },
  {
    value: "< 1s",
    label: "RESPONSE TIME",
  },
  {
    value: "100%",
    label: "AUTOMATED",
  },
];

const stack = [
  "AI AGENT",
  "WHATSAPP",
  "MYSQL",
  "API",
  "BOOKING",
];

export default function CaseStudies() {
  const { ref: sectionRef, active: sectionActive } = useSectionActive();
  const { reducedMotion } = useMotion();
  const revealedRef = useRef(false);

  useEffect(() => {
    sectionRef.current?.classList.toggle("is-section-active", sectionActive);
  }, [sectionActive, sectionRef]);

  useEffect(() => {
    if (!sectionActive || revealedRef.current || reducedMotion) return;
    revealedRef.current = true;

    const section = sectionRef.current;
    if (!section) return;

    section.setAttribute("data-revealed", "true");

    const nodes = section.querySelectorAll(".case-node");
    gsap.fromTo(
      nodes,
      { opacity: 0, scale: 0.96, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.35,
      }
    );

    const reveals = section.querySelectorAll(".case-reveal");
    gsap.fromTo(
      reveals,
      { clipPath: "inset(100% 0 0 0)", opacity: 0 },
      {
        clipPath: "inset(0 0 0 0)",
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      }
    );
  }, [sectionActive, reducedMotion, sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="work"
      data-revealed={reducedMotion ? "true" : "false"}
      className="section-motion relative overflow-hidden border-b border-white/10 px-5 py-24 md:px-8 md:py-32"
    >
      <SectionAmbient
        position="right"
        showRing
        cycleLabels={["LIVE", "CONNECTED", "AUTONOMOUS", "ONLINE"]}
      />

      {/* Grid */}
      <div className="legacy-section-grid pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="section-inner relative mx-auto max-w-[1600px]">
        <div className="section-header-bar section-fade mb-20 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            04 / Selected Work
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Systems deployed by Vantix
          </span>
        </div>

        {/* Project heading */}
        <div className="mb-16 grid gap-10 md:grid-cols-[1.2fr_0.5fr]">
          <div>
            <p className="section-fade mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
              Case study / 001
            </p>

            <h2 className="display-heading text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.8] tracking-[-0.07em]">
              <span className="display-line">AI</span>
              <span className="display-line grey-word text-white/30">OPERATIONS</span>
              <span className="display-line">SYSTEM.</span>
            </h2>
          </div>

          <div className="section-fade flex items-end">
            <p className="max-w-sm text-sm leading-6 text-white/45">
              A conversational automation system designed to handle customer
              interactions, understand intent, manage availability, and
              execute bookings without manual intervention.
            </p>
          </div>
        </div>

        {/* Main project panel */}
        <div className="case-reveal overflow-hidden border border-white/10 bg-white/[0.015]">
          {/* Project top bar */}
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-5 py-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                Live System
              </span>
            </div>

            <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">
              Healthcare / Conversational AI
            </span>
          </div>

          {/* System visualization */}
          <div className="relative min-h-[520px] overflow-hidden p-5 md:p-10">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[100px]" />

            {/* Center system */}
            <div className="case-node absolute left-1/2 top-1/2 z-10 w-[min(360px,75vw)] -translate-x-1/2 -translate-y-1/2 border border-white/20 bg-black p-6">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                  Core Engine
                </span>

                <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online
                </span>
              </div>

              <div className="mb-3 text-2xl font-medium tracking-[-0.04em]">
                VANTIX AI
              </div>

              <p className="text-xs leading-5 text-white/40">
                Conversational intelligence layer connecting customers,
                business logic, and real-time operations.
              </p>

              <div className="mt-8 h-px w-full bg-white/10" />

              <div className="mt-4 flex justify-between text-[9px] uppercase tracking-[0.14em] text-white/25">
                <span>INPUT</span>
                <span>PROCESS</span>
                <span>EXECUTE</span>
              </div>
            </div>

            {/* Left nodes */}
            <div className="case-node absolute left-5 top-16 border border-white/10 bg-black px-4 py-4 md:left-16">
              <div className="mb-4 text-[9px] tracking-[0.15em] text-white/25">
                01
              </div>

              <div className="text-[10px] uppercase tracking-[0.15em] text-white/60">
                Customer
              </div>
            </div>

            <div className="case-node absolute bottom-16 left-5 border border-white/10 bg-black px-4 py-4 md:left-16">
              <div className="mb-4 text-[9px] tracking-[0.15em] text-white/25">
                02
              </div>

              <div className="text-[10px] uppercase tracking-[0.15em] text-white/60">
                WhatsApp
              </div>
            </div>

            {/* Right nodes */}
            <div className="case-node absolute right-5 top-16 border border-white/10 bg-black px-4 py-4 md:right-16">
              <div className="mb-4 text-[9px] tracking-[0.15em] text-white/25">
                03
              </div>

              <div className="text-[10px] uppercase tracking-[0.15em] text-white/60">
                Database
              </div>
            </div>

            <div className="case-node absolute bottom-16 right-5 border border-white/10 bg-black px-4 py-4 md:right-16">
              <div className="mb-4 text-[9px] tracking-[0.15em] text-white/25">
                04
              </div>

              <div className="text-[10px] uppercase tracking-[0.15em] text-white/60">
                Booking
              </div>
            </div>

            {/* Connection lines */}
            <div className="pointer-events-none absolute left-[18%] top-[28%] h-px w-[30%] origin-left rotate-[18deg] bg-white/10" />

            <div className="pointer-events-none absolute left-[18%] bottom-[28%] h-px w-[30%] origin-left rotate-[-18deg] bg-white/10" />

            <div className="pointer-events-none absolute right-[18%] top-[28%] h-px w-[30%] origin-right rotate-[-18deg] bg-white/10" />

            <div className="pointer-events-none absolute right-[18%] bottom-[28%] h-px w-[30%] origin-right rotate-[18deg] bg-white/10" />
          </div>

          {/* Stats */}
          <div className="grid border-t border-white/10 md:grid-cols-3">
            {stats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          {/* Stack */}
          <div className="flex flex-col gap-5 border-t border-white/10 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <span className="text-[9px] uppercase tracking-[0.16em] text-white/25">
              System stack
            </span>

            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 border border-white/10 px-3 py-2 text-[8px] tracking-[0.14em] text-white/35"
                >
                  <Check size={10} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="section-fade mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-md text-xs leading-5 text-white/30">
            From the first message to the final action, every step is
            connected.
          </p>

          <a
            href="/contact"
            className="group flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.16em]"
          >
            Build something similar
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}