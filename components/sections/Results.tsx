"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

/**
 * 10 — RESULTS / PROOF
 *
 * No invented customers, testimonials, revenue, or case studies.
 * What this section can honestly claim: what the system does
 * mechanically, and what it replaces. The one "case" shown is the
 * AI Voice Receptionist as a product behaviour, not a client story.
 */

const mechanics = [
  {
    value: "0",
    label: "Missed calls",
    note: "Every call answered by the AI receptionist",
  },
  {
    value: "0",
    label: "Forgotten enquiries",
    note: "Each one captured, qualified, and followed up",
  },
  {
    value: "0",
    label: "Stale follow-ups",
    note: "Re-engagement runs on schedule, not on memory",
  },
  {
    value: "1",
    label: "System of record",
    note: "Every customer, interaction, and next action in one place",
  },
];

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const els = section.querySelectorAll(".rs-anim");
      gsap.from(els, {
        opacity: 0,
        y: 18,
        stagger: 0.07,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative overflow-hidden border-t border-white/[0.06] section-pad"
    >
      <div className="container">
        <div className="section-header">
          <div>
            <p className="mono-label mb-4 text-[var(--accent)]/70">
              What the system guarantees
            </p>
            <h2 className="section-title max-w-[720px]">
              Built so nothing gets dropped.
            </h2>
          </div>
          <span className="section-header-counter">10 / Results</span>
        </div>

        <p className="rs-anim mb-14 max-w-[620px] text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-[1.4] tracking-[-0.02em] text-white/75 md:mb-16">
          We won&apos;t invent numbers for you. What we can show is what the
          system makes structurally impossible — and what it replaces in
          your business.
        </p>

        {/* ─── Guarantees grid ─── */}
        <div className="rs-anim mb-6 grid gap-px border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {mechanics.map((m) => (
            <div
              key={m.label}
              className="group relative bg-[#050505] p-6 transition-colors duration-300 hover:bg-white/[0.015] md:p-7"
            >
              <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-none tracking-[-0.05em] text-white">
                {m.value}
              </p>
              <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.12em] text-white/70">
                {m.label}
              </p>
              <p className="mt-2 text-[11.5px] leading-[1.65] text-white/35">
                {m.note}
              </p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* ─── The honest case: AI receptionist behaviour ─── */}
        <div className="rs-anim surface">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
            <span className="mono-label text-white/[0.22]">
              Example / AI Voice Receptionist
            </span>
            <span className="mono-label text-white/[0.24]">
              ILLUSTRATIVE
            </span>
          </div>

          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mono-label mb-4 text-white/[0.2]">
                What happens on every call
              </p>
              <h3 className="font-serif text-2xl font-normal tracking-[-0.02em] text-white md:text-[2rem]">
                A phone that never goes unanswered.
              </h3>

              <div className="mt-7 space-y-0">
                {[
                  {
                    t: "Answers instantly",
                    d: "No hold music, no queue, no missed ring — nights, weekends, and peak hours included.",
                  },
                  {
                    t: "Understands the request",
                    d: "Identifies what the caller needs and asks the questions a good receptionist would ask.",
                  },
                  {
                    t: "Books the appointment",
                    d: "Checks live availability and confirms the slot in the same conversation.",
                  },
                  {
                    t: "Writes it to the CRM",
                    d: "Caller details, intent, and outcome land in the customer record automatically.",
                  },
                ].map((item, i, arr) => (
                  <div
                    key={item.t}
                    className={`py-4 ${i > 0 ? "border-t border-dotted border-white/[0.08]" : ""}`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[13.5px] font-semibold text-white/85">
                        {item.t}
                      </p>
                      <span className="mono-label shrink-0 text-[7px] text-white/[0.2]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-[1.7] text-white/40">
                      {item.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-8 border-t border-white/[0.06] pt-8 lg:border-t-0 lg:border-l lg:border-white/[0.06] lg:pl-10 lg:pt-0">
              {[
                { value: "24/7", label: "Availability" },
                { value: "< 1s", label: "Pick-up time" },
                { value: "100%", label: "Logged to CRM" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl font-normal tracking-[-0.03em] text-white md:text-4xl">
                    {s.value}
                  </p>
                  <p className="mono-label mt-1.5 text-white/[0.25]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
