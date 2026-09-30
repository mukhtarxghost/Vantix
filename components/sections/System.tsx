"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

/**
 * 07 — THE VANTIX SYSTEM
 *
 * The major visual section: the complete lifecycle from attention to
 * growth, shown as one continuous chain rather than a text diagram.
 * A scroll-scrubbed spine fills as the reader moves through it, and
 * each node states what the stage produces — capability in, customer
 * outcome out.
 */

const chain = [
  { stage: "CONTENT", out: "Your product, presented to sell" },
  { stage: "ATTENTION", out: "Reach on the channels that matter" },
  { stage: "ACQUISITION", out: "Enquiries you can act on" },
  { stage: "CONVERSION", out: "Bookings, replies, and sales" },
  { stage: "CUSTOMER", out: "A profile, not a transaction" },
  { stage: "CRM", out: "One record for every relationship" },
  { stage: "MANAGEMENT", out: "Personalised follow-up, always on" },
  { stage: "RE-ENGAGEMENT", out: "Customers brought back" },
  { stage: "RETENTION", out: "Repeat business by design" },
  { stage: "GROWTH", out: "Value that compounds" },
];

export default function System() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // The spine fills as the section scrolls through
      const spine = section.querySelector<HTMLElement>(".sys-spine");
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".sys-chain",
              start: "top 70%",
              end: "bottom 45%",
              scrub: 0.6,
            },
          }
        );
      }

      // Nodes light up in sequence with the spine
      const nodes = section.querySelectorAll(".sys-node");
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0.25 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: node,
              start: "top 72%",
              end: "top 45%",
              scrub: 0.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="system"
      className="relative overflow-hidden border-t border-white/[0.06] section-pad"
    >
      <div className="container">
        <div className="section-header">
          <div>
            <p className="mono-label mb-4 text-[var(--accent)]/70">
              The Vantix system
            </p>
            <h2 className="section-title max-w-[760px]">
              One system, from first sight to repeat growth.
            </h2>
          </div>
          <span className="section-header-counter">07 / System</span>
        </div>

        <p className="mb-14 max-w-[620px] text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-[1.4] tracking-[-0.02em] text-white/75 md:mb-16">
          Every stage hands the next one its input. The content the
          acquisition engine needs is produced in-house; the customers it
          wins are managed in the same system that won them.
        </p>

        {/* ─── The chain ─── */}
        <div className="sys-chain relative">
          {/* Spine */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/[0.07] md:left-[9px]" />
          <div className="sys-spine absolute bottom-2 left-[7px] top-2 w-px origin-top bg-[var(--accent)]/60 md:left-[9px]" />

          <div className="flex flex-col gap-8 md:gap-9">
            {chain.map((c, i) => (
              <div key={c.stage} className="sys-node relative flex gap-6 md:gap-10">
                {/* Node dot */}
                <span
                  className={`relative z-[1] mt-[5px] h-[15px] w-[15px] shrink-0 rounded-full border md:mt-[7px] md:h-[19px] md:w-[19px] ${
                    i === chain.length - 1
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-white/[0.2] bg-[#050505]"
                  }`}
                />
                <div className="grid flex-1 gap-1 border-b border-white/[0.06] pb-6 md:grid-cols-[220px_1fr] md:items-baseline md:gap-8 md:pb-7">
                  <div className="flex items-baseline gap-4">
                    <span className="mono-label shrink-0 text-white/[0.16]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className={`text-[15px] font-bold uppercase tracking-[0.1em] md:text-[17px] ${
                        i === chain.length - 1
                          ? "text-[var(--accent)]"
                          : "text-white/90"
                      }`}
                    >
                      {c.stage}
                    </p>
                  </div>
                  <p className="pl-[31px] text-[12.5px] leading-[1.6] text-white/40 md:pl-0">
                    {c.out}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
