"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

/**
 * 06 — PERSONALISED AUTOMATION
 *
 * Answers: "How do you personalise the relationship?"
 *
 * The message: automation that understands the customer — not
 * automation that spams customers. Every workflow below keys off who
 * the customer is and what has already happened between them and the
 * business.
 *
 * Also the section that makes explicit what the whole system is for:
 * new customers AND existing customers both flow through Vantix.
 */

const workflows = [
  {
    tag: "NEW CUSTOMER",
    steps: [
      "Welcome",
      "Personalised follow-up",
      "Conversion",
      "Customer profile",
    ],
    key: "Profile built from day one",
  },
  {
    tag: "EXISTING CUSTOMER",
    steps: [
      "Last interaction",
      "Customer history",
      "Re-engagement",
      "Personalised message",
    ],
    key: "History shapes the message",
  },
  {
    tag: "MISSED APPOINTMENT",
    steps: ["Detected", "Follow-up", "Reschedule", "CRM updated"],
    key: "Nothing falls through",
  },
  {
    tag: "PREVIOUS ENQUIRY",
    steps: [
      "Customer identified",
      "Context retrieved",
      "Relevant response",
      "Next action",
    ],
    key: "Never asks twice",
  },
];

export default function Automate() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const els = section.querySelectorAll(".au-anim");
      gsap.from(els, {
        opacity: 0,
        y: 18,
        stagger: 0.06,
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
      id="automation"
      className="relative overflow-hidden border-t border-white/[0.06] section-pad"
    >
      <div className="container">
        <div className="section-header">
          <div>
            <p className="mono-label mb-4 text-[var(--accent)]/70">
              Stage 04 — Personalised automation
            </p>
            <h2 className="section-title max-w-[780px]">
              Automation that understands the customer.
            </h2>
          </div>
          <span className="section-header-counter">06 / Automation</span>
        </div>

        <p className="au-anim mb-14 max-w-[640px] text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-[1.4] tracking-[-0.02em] text-white/75 md:mb-16">
          Not &ldquo;if X, send WhatsApp.&rdquo; Every message keys off who
          the customer is, what they bought, and what happened last — so a
          follow-up reads like someone who knows them, not a system that
          found them.
        </p>

        {/* ─── Workflow grid ─── */}
        <div className="au-anim grid gap-px border border-white/[0.07] bg-white/[0.06] md:grid-cols-2">
          {workflows.map((w) => (
            <div
              key={w.tag}
              className="group bg-[#050505] p-6 transition-colors duration-300 hover:bg-white/[0.015] md:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="mono-label text-[var(--accent)]/70">
                  {w.tag}
                </span>
                <span className="text-white/[0.1] transition-colors group-hover:text-[var(--accent)]/50">
                  ↻
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-y-2">
                {w.steps.map((s, i) => (
                  <span key={s} className="flex items-center">
                    <span className="border border-white/[0.1] bg-white/[0.02] px-2.5 py-1.5 text-[10.5px] font-medium text-white/70">
                      {s}
                    </span>
                    {i < w.steps.length - 1 && (
                      <span className="px-1.5 text-[10px] text-white/[0.18]">
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <p className="mt-5 border-t border-white/[0.06] pt-4 text-[11px] text-white/35">
                {w.key}
              </p>
            </div>
          ))}
        </div>

        {/* ─── New + Existing — the two inflows of the whole system ─── */}
        <div className="au-anim mt-6 grid gap-px border border-white/[0.07] bg-white/[0.06] md:grid-cols-2">
          {[
            {
              label: "New customers",
              line: "Created by the acquisition engine — captured, qualified, welcomed, and given a profile from the first touch.",
            },
            {
              label: "Existing customers",
              line: "Imported into the same system — history, preferences, and past appointments carried into every message that follows.",
            },
          ].map((c) => (
            <div key={c.label} className="bg-[#050505] p-6 md:p-7">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-white/85">
                {c.label}
              </p>
              <p className="mt-3 text-[12.5px] leading-[1.7] text-white/40">
                {c.line}
              </p>
            </div>
          ))}
          <div className="bg-[#050505] p-6 md:col-span-2 md:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="mono-label text-white/[0.25]">
                CUSTOMER DATA
              </span>
              <span className="text-white/[0.15]">→</span>
              <span className="mono-label text-white/[0.25]">CONTEXT</span>
              <span className="text-white/[0.15]">→</span>
              <span className="mono-label text-white/[0.25]">FOLLOW-UP</span>
              <span className="text-white/[0.15]">→</span>
              <span className="mono-label text-white/[0.25]">
                RE-ENGAGEMENT
              </span>
              <span className="text-white/[0.15]">→</span>
              <span className="mono-label text-white/[0.25]">RETENTION</span>
              <span className="text-white/[0.15]">→</span>
              <span className="mono-label text-[var(--accent)]/80">GROWTH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
