"use client";

import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b border-white/10 px-5 py-24 md:px-8 md:py-32"
    >
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[140px]" />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-20 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            05 / Start a project
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Vantix Automation Solutions
          </span>
        </div>

        {/* Main statement */}
        <div className="max-w-[1250px]">
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-white/40">
            Your next system starts here
          </p>

          <h2 className="text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.78] tracking-[-0.075em]">
            LET&apos;S
            <br />
            <span className="text-white/30">BUILD</span>
            <br />
            SOMETHING
            <br />
            THAT RUNS.
          </h2>
        </div>

        {/* Bottom action */}
        <div className="mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="max-w-md text-sm leading-6 text-white/45">
                Tell us what is slowing your business down. We&apos;ll figure
                out what can be automated, what can be connected, and what
                should run without you.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

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

        {/* Coordinates */}
        <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-4">
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