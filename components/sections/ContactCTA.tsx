"use client";

import { useEffect } from "react";
import { useSectionActive } from "@/hooks/useSectionActive";
import SectionAmbient from "@/components/ui/SectionAmbient";

export default function ContactCTA() {
  const { ref: sectionRef, active: sectionActive } = useSectionActive();

  useEffect(() => {
    sectionRef.current?.classList.toggle("is-section-active", sectionActive);
  }, [sectionActive, sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="contact-book"
      className="section-motion section-convergence relative overflow-hidden border-b border-white/10 px-5 py-24 md:px-8 md:py-32"
    >
      <SectionAmbient
        position="right"
        showRing
        cycleLabels={["AVAILABLE", "ONLINE", "RESPONDING", "READY"]}
      />

      <div className="legacy-section-grid pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="section-inner relative mx-auto max-w-[1600px]">
        <div className="section-header-bar section-fade mb-24 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            06 / Contact
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Start a conversation
          </span>
        </div>

        <div className="grid gap-16 md:grid-cols-[1fr_360px] md:items-end">
          <div>
            <p className="section-fade mb-8 text-xs uppercase tracking-[0.2em] text-white/35">
              Have a project in mind?
            </p>

            <h2 className="display-heading max-w-[1000px] text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.78] tracking-[-0.075em] text-white">
              <span className="display-line">LET&apos;S</span>
              <span className="display-line">TALK.</span>
            </h2>
          </div>

          <div className="section-fade max-w-sm">
            <p className="mb-8 text-sm leading-6 text-white/40">
              Tell us what is slowing your business down. We&apos;ll figure
              out whether automation can solve it.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href="/book"
                className="group flex items-center justify-between border border-white/20 px-5 py-4 transition-all duration-300 hover:border-white/60 hover:bg-white hover:text-black"
              >
                <span className="text-[10px] uppercase tracking-[0.18em]">
                  Book a call
                </span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="/contact"
                className="group flex items-center justify-between border border-white/10 px-5 py-4 text-white/55 transition-all duration-300 hover:border-white/40 hover:text-white"
              >
                <span className="text-[10px] uppercase tracking-[0.18em]">
                  Contact us
                </span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="section-fade mt-24 grid border-t border-white/10 md:grid-cols-3">
          <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r md:pl-0">
            <span className="block text-[9px] uppercase tracking-[0.18em] text-white/20">
              Availability
            </span>

            <span className="mt-2 block text-xs text-white/50">
              Accepting new projects
            </span>
          </div>

          <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r md:px-6">
            <span className="block text-[9px] uppercase tracking-[0.18em] text-white/20">
              Location
            </span>

            <span className="mt-2 block text-xs text-white/50">
              Mumbai, India
            </span>
          </div>

          <div className="p-5 md:pr-0">
            <span className="block text-[9px] uppercase tracking-[0.18em] text-white/20">
              Status
            </span>

            <span className="mt-2 flex items-center gap-2 text-xs text-white/50">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Online
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
