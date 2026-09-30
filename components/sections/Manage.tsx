"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

/**
 * 05 — MANAGE
 *
 * Answers: "How do you manage my customers?"
 *
 * The strongest section alongside automation. A business owner should
 * look at this and think: "Vantix knows who my customers are and what
 * is happening with them." Built as a believable product interface —
 * database rows, a live profile, a follow-up queue — not a feature list.
 *
 * All records are illustrative interface content.
 */

const rows = [
  { name: "Sarah M.", status: "NEW", detail: "Enquiry via Instagram", when: "2m ago", accent: true },
  { name: "James W.", status: "BOOKED", detail: "Consult · Tue 10:00", when: "Today", accent: false },
  { name: "Noah P.", status: "ACTIVE", detail: "Premium package", when: "3d ago", accent: false },
  { name: "Mia K.", status: "RETURNING", detail: "Fourth purchase", when: "1w ago", accent: false },
  { name: "David K.", status: "WIN-BACK", detail: "Inactive 30 days", when: "30d ago", accent: false },
];

const timeline = [
  { label: "Enquiry received", meta: "Instagram DM", state: "done" },
  { label: "Qualified by AI", meta: "Intent: premium", state: "done" },
  { label: "Appointment booked", meta: "Tue · 10:00", state: "done" },
  { label: "Follow-up scheduled", meta: "Auto · after visit", state: "next" },
];

const queue = [
  { who: "David K.", what: "Win-back message", when: "Due 14:00", hot: true },
  { who: "Maya R.", what: "Proposal follow-up", when: "Due 16:30", hot: false },
  { who: "Leo P.", what: "Appointment reminder", when: "Tomorrow", hot: false },
];

const counts = [
  { label: "Total customers", value: "2,481" },
  { label: "New this month", value: "142" },
  { label: "Active", value: "1,872" },
  { label: "Returning", value: "467" },
];

export default function Manage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const els = section.querySelectorAll(".mg-anim");
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
      id="manage"
      className="relative overflow-hidden border-t border-white/[0.06] section-pad"
    >
      <div className="container">
        <div className="section-header">
          <div>
            <p className="mono-label mb-4 text-[var(--accent)]/70">
              Stage 03 — Manage
            </p>
            <h2 className="section-title max-w-[760px]">
              Every customer, in one living record.
            </h2>
          </div>
          <span className="section-header-counter">05 / Manage</span>
        </div>

        <p className="mg-anim mb-14 max-w-[620px] text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-[1.4] tracking-[-0.02em] text-white/75 md:mb-16">
          Who they are, what they bought, what they asked about, when you
          last spoke, and what should happen next. Not scattered across an
          inbox and a spreadsheet — one system of record for every
          relationship.
        </p>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* ─── Customer database ─── */}
          <div className="mg-anim surface">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <span className="mono-label text-white/[0.22]">
                Vantix / Customer database
              </span>
              <span className="mono-label text-white/[0.24]">
                ILLUSTRATIVE
              </span>
            </div>

            {/* Count strip */}
            <div className="grid grid-cols-2 gap-px border-b border-white/[0.06] bg-white/[0.06] sm:grid-cols-4">
              {counts.map((c) => (
                <div key={c.label} className="bg-[#050505] px-4 py-3.5">
                  <p className="text-[16px] font-semibold tabular-nums tracking-[-0.02em] text-white">
                    {c.value}
                  </p>
                  <p className="mono-label mt-0.5 text-[7px] text-white/35">
                    {c.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="p-2.5 md:p-3">
              {rows.map((r, i) => (
                <div
                  key={r.name}
                  className={`flex items-center justify-between gap-3 px-2.5 py-3 ${
                    i > 0 ? "border-t border-white/[0.04]" : ""
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        r.accent ? "bg-[var(--accent)]" : "bg-white/[0.2]"
                      }`}
                    />
                    <span className="text-[12.5px] font-medium text-white/90">
                      {r.name}
                    </span>
                    <span className="hidden truncate text-[11px] text-white/35 sm:inline">
                      {r.detail}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={`text-[8px] font-bold uppercase tracking-[0.14em] ${
                        r.accent ? "text-[var(--accent)]" : "text-white/40"
                      }`}
                    >
                      {r.status}
                    </span>
                    <span className="mono-label hidden w-14 text-right text-[7px] text-white/[0.2] sm:block">
                      {r.when}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06] px-5 py-3">
              <span className="mono-label text-[8px] text-white/[0.2]">
                PROFILES · HISTORY · NOTES · SEGMENTS · LIFECYCLE
              </span>
            </div>
          </div>

          {/* ─── Right column: profile + queue ─── */}
          <div className="flex flex-col gap-6">
            {/* Profile */}
            <div className="mg-anim surface">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                <span className="mono-label text-white/[0.22]">
                  Customer profile
                </span>
                <span className="mono-label text-[var(--accent)]/70">NEW</span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 text-[10px] font-bold text-white/90">
                    SM
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-white">
                      Sarah M.
                    </p>
                    <p className="mono-label mt-0.5 text-[7px] text-white/40">
                      FIRST ENQUIRY 2 DAYS AGO
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["PREMIUM", "HIGH INTENT", "INSTAGRAM"].map((t) => (
                    <span
                      key={t}
                      className="border border-white/[0.12] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] text-white/45"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 border-t border-white/[0.06] pt-4">
                  {timeline.map((t, i) => (
                    <div key={t.label} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border text-[8px] ${
                            t.state === "done"
                              ? "border-[var(--accent)] bg-[var(--accent)] font-bold text-black"
                              : "border-white/[0.2] text-white/40"
                          }`}
                        >
                          {t.state === "done" ? "✓" : "·"}
                        </span>
                        {i < timeline.length - 1 && (
                          <span className="my-0.5 h-3.5 w-px bg-white/[0.1]" />
                        )}
                      </div>
                      <div className="flex flex-1 items-center justify-between pb-1.5 pt-0.5">
                        <span
                          className={`text-[10.5px] ${
                            t.state === "done" ? "text-white/85" : "text-white/45"
                          }`}
                        >
                          {t.label}
                        </span>
                        <span className="mono-label text-[7px] text-white/30">
                          {t.meta}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Follow-up queue */}
            <div className="mg-anim surface flex-1">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                <span className="mono-label text-white/[0.22]">
                  Follow-up queue
                </span>
                <span className="mono-label text-white/[0.24]">
                  AUTO-TRIAGED
                </span>
              </div>
              <div className="p-5">
                {queue.map((q, i) => (
                  <div key={q.who}>
                    {i > 0 && <div className="my-3 h-px bg-white/[0.05]" />}
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11.5px] font-medium text-white/90">
                          {q.who}
                        </p>
                        <p className="text-[10.5px] text-white/40">{q.what}</p>
                      </div>
                      <span
                        className={`mono-label shrink-0 text-[7px] ${
                          q.hot ? "text-[var(--accent)]/90" : "text-white/30"
                        }`}
                      >
                        {q.when}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
