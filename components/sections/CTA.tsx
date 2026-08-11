"use client";

import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSectionActive } from "@/hooks/useSectionActive";
import SectionAmbient from "@/components/ui/SectionAmbient";

export default function CTA() {
  const { ref: sectionRef, active: sectionActive } = useSectionActive();

  useEffect(() => {
    sectionRef.current?.classList.toggle("is-section-active", sectionActive);
  }, [sectionActive, sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-motion section-convergence relative overflow-hidden border-b border-white/10 px-5 py-24 md:px-8 md:py-32"
    >
      <SectionAmbient
        position="center"
        size="lg"
        showRing
        cycleLabels={["READY", "ACCEPTING", "DEPLOYING", "ONLINE"]}
      />

      <div className="legacy-section-grid pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="section-inner relative mx-auto max-w-[1600px]">
        <div className="section-header-bar section-fade mb-20 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            05 / Start a project
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Vantix Automation Solutions
          </span>
        </div>

        <div className="max-w-[1250px]">
          <p className="section-fade mb-8 text-xs uppercase tracking-[0.2em] text-white/40">
            Your next system starts here
          </p>

          <h2 className="display-heading text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.78] tracking-[-0.075em]">
            <span className="display-line">LET&apos;S</span>
            <span className="display-line grey-word text-white/30">BUILD</span>
            <span className="display-line">SOMETHING</span>
            <span className="display-line">THAT RUNS.</span>
          </h2>
        </div>

        <div className="section-fade mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="max-w-md text-sm leading-6 text-white/45">
                Tell us what is slowing your business down. We&apos;ll figure
                out what can be automated, what can be connected, and what
                should run without you.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>

                <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Currently accepting projects
                </span>
              </div>
            </div>

            <a
              href="/contact"
              className="group flex w-full items-center justify-between border border-white/20 px-6 py-5 transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-black md:w-[420px]"
            >
              <span className="text-xs uppercase tracking-[0.18em]">
                Start a project
              </span>

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        <div className="section-fade mt-24 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">
            Vantix / Automation Solutions
          </span>

          <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">
            19.04° N / 72.88° E
          </span>
        </div>
      </div>
    </section>
  );
}
