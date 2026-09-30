"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

/**
 * 02 — THE PROBLEM
 *
 * "Attention is useless if it doesn't become customers."
 *
 * One clear question per section. This one answers:
 * why does attention leak away on the way to becoming customers?
 *
 * The leak is shown, not listed: a funnel where the numbers thin out
 * at every stage, with the reason attached to each drop. The UI panel
 * on the right is the same visual language as the hero wall — the
 * business reads it as "this is what my funnel looks like today".
 */

const leakStages = [
  { label: "People who saw you", value: "12,480", pct: 100, drop: null, leak: null },
  { label: "Visited the site", value: "3,120", pct: 25, drop: "25% of the stage above", leak: "No reason to stay" },
  { label: "Raised an enquiry", value: "486", pct: 4, drop: "16% of the stage above", leak: "Slow reply, no follow-up" },
  { label: "Became customers", value: "74", pct: 0.6, drop: "15% of the stage above", leak: "Nobody was managing them" },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll(".leak-row");
      gsap.from(rows, {
        opacity: 0,
        x: -14,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });

      const bars = section.querySelectorAll(".leak-bar-fill");
      gsap.from(bars, {
        scaleX: 0,
        transformOrigin: "left center",
        stagger: 0.1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative overflow-hidden border-t border-white/[0.06] section-pad"
    >
      <div className="container">
        <div className="section-header">
          <div>
            <p className="mono-label mb-4 text-[var(--accent)]/70">The problem</p>
            <h2 className="section-title max-w-[760px]">
              Attention is worthless
              <br />
              until it becomes a customer.
            </h2>
          </div>
          <span className="section-header-counter">02 / Problem</span>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left — the argument */}
          <div>
            <p className="max-w-[540px] text-[clamp(1.15rem,2.2vw,1.65rem)] font-medium leading-[1.35] tracking-[-0.03em] text-white/75">
              Most businesses can get attention. Views, clicks, calls, walks
              past the door. The money is lost in what happens next — the
              reply that took hours, the enquiry nobody followed up, the
              customer who bought once and never heard from you again.
            </p>

            <p className="mt-7 max-w-[500px] text-[13.5px] leading-[1.8] text-white/40">
              The product is rarely the problem. The journey around it is:
              fragmented across an inbox here, a spreadsheet there, a phone
              that only gets answered when someone is free. Growth doesn&apos;t
              come from more attention — it comes from a system that carries
              every person from first sight to loyal customer.
            </p>

            {/* The three failures — one line each */}
            <div className="mt-12 border-t border-white/[0.06]">
              {[
                {
                  n: "01",
                  t: "Attention leaks on the way in",
                  d: "Ads and content bring people to a site that doesn't hold them.",
                },
                {
                  n: "02",
                  t: "Enquiries leak on the way through",
                  d: "Slow replies and unqualified conversations lose people who were ready to buy.",
                },
                {
                  n: "03",
                  t: "Customers leak on the way back",
                  d: "No follow-up, no re-engagement — the second purchase never happens.",
                },
              ].map((item) => (
                <div
                  key={item.n}
                  className="group flex items-baseline gap-5 border-b border-white/[0.06] py-5"
                >
                  <span className="mono-label shrink-0 text-white/[0.16] transition-colors group-hover:text-[var(--accent)]/70">
                    {item.n}
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold tracking-[-0.02em] text-white/85">
                      {item.t}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-[1.6] text-white/35">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — the leak, visualised as a funnel panel */}
          <div className="surface">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <span className="mono-label text-white/[0.22]">
                Illustrative / Where attention leaks
              </span>
              <span className="mono-label text-white/[0.24]">30 DAYS</span>
            </div>

            <div className="p-5 md:p-7">
              {leakStages.map((s, i) => (
                <div key={s.label} className="leak-row mb-1.5 last:mb-0">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] font-medium text-white/70">
                      {s.label}
                    </span>
                    <span className="text-[13px] font-semibold tabular-nums text-white/90">
                      {s.value}
                    </span>
                  </div>
                  <div className="mt-2 h-[6px] w-full overflow-hidden bg-white/[0.05]">
                    <div
                      className={`leak-bar-fill h-full ${
                        i === leakStages.length - 1
                          ? "bg-[var(--accent)]/80"
                          : "bg-white/[0.22]"
                      }`}
                      style={{ width: `${Math.max(s.pct, 1.2)}%` }}
                    />
                  </div>
                  <div className="mt-1.5 flex h-[14px] items-center justify-between">
                    <span className="mono-label text-[8px] text-white/[0.22]">
                      {s.drop ?? "—"}
                    </span>
                    {s.leak && (
                      <span className="mono-label text-[8px] text-[var(--accent)]/60">
                        {s.leak}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <p className="text-[12.5px] leading-[1.7] text-white/45">
                  Every stage above is a place where a business without a
                  system quietly loses the customers it already paid for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
