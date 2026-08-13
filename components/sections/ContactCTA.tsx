"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, ArrowRight } from "lucide-react";
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
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono">
            06 / Contact & Discovery
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono">
            Start a conversation
          </span>
        </div>

        <div className="grid gap-16 md:grid-cols-[1fr_420px] md:items-end">
          <div>
            <p className="section-fade mb-6 text-xs font-mono uppercase tracking-[0.2em] text-white/35">
              Have a system requirement?
            </p>

            <h2 className="display-heading max-w-[1000px] text-[clamp(3.8rem,8.5vw,8.5rem)] font-medium leading-[0.78] tracking-[-0.075em] text-white">
              <span className="display-line">LET&apos;S</span>
              <span className="display-line text-white/30">TALK.</span>
            </h2>
          </div>

          {/* Bold, Intentional, Clicky Book a Call CTA Card */}
          <div className="section-fade space-y-4">
            <p className="text-xs leading-5 text-white/50">
              Schedule a 15-minute system discovery call directly with our automation team.
            </p>

            <Link
              href="/book"
              className="group relative flex w-full items-center justify-between border-2 border-white bg-white px-6 py-5 text-black shadow-[0_0_35px_rgba(255,255,255,0.18)] transition-all duration-200 hover:bg-[#f0f0f0] hover:scale-[1.015] active:scale-[0.985] cursor-pointer"
            >
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-black/60 font-bold">
                    System Discovery Call
                  </span>
                </div>
                <span className="text-sm font-mono uppercase font-bold tracking-[0.16em] text-black">
                  Book a call
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden text-[10px] font-mono uppercase tracking-[0.12em] text-black/60 sm:inline">
                  15 Min // Live
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link
              href="/contact"
              className="group flex w-full items-center justify-between border border-white/15 bg-white/[0.02] px-6 py-4 text-white/70 transition-all duration-200 hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.18em]">
                Or submit a project brief
              </span>

              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        <div className="section-fade mt-24 grid border-t border-white/10 md:grid-cols-3">
          <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r md:pl-0">
            <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-white/20">
              Availability
            </span>

            <span className="mt-2 block text-xs text-white/50">
              Accepting new project pipelines
            </span>
          </div>

          <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r md:px-6">
            <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-white/20">
              Location
            </span>

            <span className="mt-2 block text-xs text-white/50">
              Mumbai, India (Global Operations)
            </span>
          </div>

          <div className="p-5 md:pr-0">
            <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-white/20">
              Status
            </span>

            <span className="mt-2 flex items-center gap-2 text-xs text-white/50">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Systems Online
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}