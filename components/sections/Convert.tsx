"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

/**
 * 04 — CONVERT
 *
 * Answers: "How do you turn enquiries into customers?"
 *
 * Two surfaces:
 *  1. The landing experience — traffic without a good experience is
 *     lost customers. Shown as a conversion-focused page panel.
 *  2. The conversation — AI chat and the AI Voice Receptionist
 *     handling enquiries the moment they arrive.
 *
 * All data is illustrative interface content, not client results.
 */

const journey = [
  { stage: "AD", note: "Click from campaign" },
  { stage: "LANDING PAGE", note: "One message, one action" },
  { stage: "PRODUCT", note: "Offer made clear" },
  { stage: "ENQUIRY", note: "Captured in seconds" },
  { stage: "BOOKED", note: "Customer created" },
];

export default function Convert() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const els = section.querySelectorAll(".cv-anim");
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
      id="convert"
      className="relative overflow-hidden border-t border-white/[0.06] section-pad"
    >
      <div className="container">
        <div className="section-header">
          <div>
            <p className="mono-label mb-4 text-[var(--accent)]/70">
              Stage 02 — Convert
            </p>
            <h2 className="section-title max-w-[760px]">
              Traffic without an experience is attention wasted.
            </h2>
          </div>
          <span className="section-header-counter">04 / Convert</span>
        </div>

        <p className="cv-anim mb-14 max-w-[620px] text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-[1.4] tracking-[-0.02em] text-white/75 md:mb-16">
          A click is a promise. The page has to keep it, and the enquiry
          has to be answered while the intent is still warm — by the page,
          by chat, or by a voice that never puts anyone on hold.
        </p>

        {/* ─── AD → LANDING → ENQUIRY → BOOKED journey strip ─── */}
        <div className="cv-anim mb-14 md:mb-16">
          <div className="flex items-stretch gap-px overflow-hidden border border-white/[0.07] bg-white/[0.06]">
            {journey.map((j, i) => (
              <div key={j.stage} className="group relative flex-1 bg-[#050505] p-4">
                <div className="flex items-center justify-between">
                  <span className="mono-label text-white/[0.16]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < journey.length - 1 && (
                    <span className="text-white/[0.12] transition-colors group-hover:text-[var(--accent)]/60">
                      →
                    </span>
                  )}
                </div>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/85">
                  {j.stage}
                </p>
                <p className="mt-1 text-[11px] text-white/35">{j.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Two product surfaces ─── */}
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Landing page experience — the premium design surface */}
          <div className="cv-anim surface">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <span className="mono-label text-white/[0.22]">
                Vantix / Landing experience
              </span>
              <span className="mono-label text-white/[0.24]">
                ILLUSTRATIVE
              </span>
            </div>

            <div className="p-5 md:p-7">
              {/* Mini landing page mock */}
              <div className="overflow-hidden border border-white/[0.08] bg-[#0b0b0b]">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
                  <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
                  <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
                  <span className="mono-label ml-3 text-[8px] text-white/[0.2]">
                    yourbusiness.com/offer
                  </span>
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="max-w-[62%]">
                      <span className="mono-label text-[8px] text-[var(--accent)]/70">
                        From the ad
                      </span>
                      <p className="mt-2.5 text-[clamp(1.15rem,2.4vw,1.7rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
                        The exact thing you clicked for.
                      </p>
                      <p className="mt-3 text-[11.5px] leading-[1.65] text-white/40">
                        Same message, same offer, zero friction between the
                        click and the enquiry.
                      </p>
                      <div className="mt-5 inline-flex items-center gap-2 border border-white bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-black">
                        Book now
                        <span className="text-[var(--accent)]">→</span>
                      </div>
                    </div>
                    {/* Product visual slot */}
                    <div className="hidden w-[34%] shrink-0 sm:block">
                      <div className="flex aspect-[4/5] items-center justify-center border border-white/[0.08] bg-white/[0.02]">
                        <span className="mono-label text-[8px] text-white/[0.16]">
                          PRODUCT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enquiry strip */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      <span className="text-[10px] text-white/50">
                        Enquiry captured
                      </span>
                    </div>
                    <span className="mono-label text-[8px] text-white/[0.3]">
                      FIELDS · NAME · CONTACT · TIME
                    </span>
                  </div>
                </div>
              </div>

              {/* Capability row */}
              <div className="mt-6 grid grid-cols-2 gap-px border border-white/[0.06] bg-white/[0.06] sm:grid-cols-4">
                {[
                  "Conversion UX",
                  "Brand refinement",
                  "CTA optimisation",
                  "Enquiry flows",
                ].map((t) => (
                  <span
                    key={t}
                    className="bg-[#050505] px-3 py-2.5 text-center text-[9px] font-medium uppercase tracking-[0.1em] text-white/40"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Conversations — chat + voice */}
          <div className="flex flex-col gap-6">
            {/* AI chat */}
            <div className="cv-anim surface">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                <span className="mono-label text-white/[0.22]">
                  Vantix / AI conversation
                </span>
                <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                  <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                  Replying
                </span>
              </div>
              <div className="flex flex-col gap-2.5 p-5">
                <div className="max-w-[90%] self-start rounded-[4px] border border-white/[0.12] bg-white/[0.03] px-3.5 py-2.5">
                  <p className="text-[11.5px] leading-relaxed text-white/80">
                    &ldquo;Is there an appointment available tomorrow?&rdquo;
                  </p>
                </div>
                <div className="max-w-[90%] self-end rounded-[4px] border border-[var(--accent)]/25 bg-[var(--accent)]/[0.06] px-3.5 py-2.5">
                  <p className="text-[11.5px] leading-relaxed text-white/95">
                    &ldquo;Yes — I can offer 10:30 or 4:15. Which works
                    better?&rdquo;
                  </p>
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <span className="mono-label text-[8px] text-white/[0.25]">
                    QUALIFIED → BOOKED
                  </span>
                  <span className="mono-label text-[8px] text-[var(--accent)]/80">
                    CUSTOMER CREATED
                  </span>
                </div>
              </div>
            </div>

            {/* AI Voice Receptionist — the flagship */}
            <div className="cv-anim surface flex-1">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                <span className="mono-label text-white/[0.22]">
                  Vantix / AI Voice Receptionist
                </span>
                <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  On call
                </span>
              </div>

              <div className="p-5">
                {/* Waveform */}
                <div className="flex h-12 items-center gap-[3px]">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const h =
                      Math.round((6 + Math.abs(Math.sin(i * 0.7)) * 34) * 10) / 10;
                    return (
                      <div
                        key={i}
                        className={`w-[3px] flex-1 rounded-full ${
                          i > 20 ? "bg-[var(--accent)]/75" : "bg-white/[0.2]"
                        }`}
                        style={{ height: `${h}px` }}
                      />
                    );
                  })}
                </div>

                <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
                  <p className="text-[11px] leading-[1.6] text-white/55">
                    Caller: &ldquo;Can I book tomorrow?&rdquo;
                  </p>
                  <p className="text-[11px] leading-[1.6] text-white/85">
                    Vantix: &ldquo;Absolutely — I have 6:30 PM available.
                    Shall I hold it for you?&rdquo;
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border border-[var(--accent)]/20 bg-[var(--accent)]/[0.05] px-3.5 py-2.5">
                  <span className="mono-label text-[8px] text-white/60">
                    OUTCOME
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                    Booked · synced to CRM
                  </span>
                </div>

                <p className="mt-4 text-[11.5px] leading-[1.7] text-white/35">
                  Every call answered, qualified, and booked — after hours,
                  during rush, whenever it rings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
