"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

const stages = [
  {
    number: "01",
    label: "ACQUIRE",
    description:
      "Attract new customers and generate enquiries. Landing pages and campaigns that turn attention into demand.",
    metrics: ["Traffic", "Leads", "Enquiries"],
  },
  {
    number: "02",
    label: "CONVERT",
    description:
      "Conversational handling, an AI voice receptionist, and lead qualification that turn demand into bookings.",
    metrics: ["Booking Rate", "Qualification", "Response Time"],
  },
  {
    number: "03",
    label: "MANAGE",
    description:
      "Every customer in one database. Follow-ups, re-engagement, and workflows that run automatically.",
    metrics: ["CRM", "Workflows", "Automation"],
  },
  {
    number: "04",
    label: "RETAIN",
    description:
      "Systematic follow-up and re-engagement that keep customers coming back — without the manual chase.",
    metrics: ["Follow-ups", "Re-engagement", "Retention"],
  },
  {
    number: "05",
    label: "GROW",
    description:
      "Repeat customers and higher lifetime value through better customer lifecycle management.",
    metrics: ["LTV", "Referrals", "Repeat Rate"],
  },
];

export default function Platform() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll(".platform-step");
      const bar = section.querySelector(".platform-bar-fill");

      gsap.from(items, {
        y: 24,
        opacity: 0,
        stagger: 0.09,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power2.inOut",
            delay: 0.3,
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="relative overflow-hidden section-pad"
    >
      <div className="container">
        {/* Section header */}
        <div className="section-header">
          <div>
            <p className="mono-label mb-4 text-[var(--accent)]/70">
              The Vantix system
            </p>
            <h2 className="section-title max-w-[720px]">
              Customer growth, reduced to a system.
            </h2>
          </div>
          <span className="section-header-counter">01 / System</span>
        </div>

        {/* Pipeline progress bar */}
        <div className="relative mb-14 hidden items-center justify-between md:flex">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/[0.06]" />
          <div className="platform-bar-fill absolute inset-x-0 top-1/2 h-px -translate-y-1/2 origin-left bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent)]" />
          {stages.map((stage, i) => (
            <div
              key={stage.number}
              className="relative flex flex-col items-center gap-3"
            >
              <span className="mono-label text-white/25">{stage.label}</span>
              <span className="flex h-2 w-2 items-center justify-center">
                <span
                  className={`h-2 w-2 rounded-full border ${
                    i === stages.length - 1
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-white/25 bg-[#050505]"
                  }`}
                />
              </span>
            </div>
          ))}
        </div>

        {/* Stages */}
        <div className="grid gap-px border border-white/[0.06] bg-white/[0.06] md:grid-cols-3 lg:grid-cols-5">
          {stages.map((stage) => (
            <div
              key={stage.number}
              className="platform-step group relative bg-[#050505] p-6 transition-colors duration-300 hover:bg-white/[0.015] lg:p-7"
            >
              <div className="flex items-baseline justify-between">
                <span className="mono-label text-white/[0.15] transition-colors duration-300 group-hover:text-[var(--accent)]/70">
                  {stage.number}
                </span>
                <span className="text-white/[0.08] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]/50">
                  →
                </span>
              </div>

              <h3 className="mt-10 text-[clamp(1.35rem,2.4vw,1.8rem)] font-semibold tracking-[-0.04em] text-white">
                {stage.label}
              </h3>

              <p className="mt-4 text-[13px] leading-[1.7] text-white/35">
                {stage.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {stage.metrics.map((m) => (
                  <span key={m} className="tag">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}