"use client";

import { useEffect, useState } from "react";
import { useSectionActive } from "@/hooks/useSectionActive";
import SectionAmbient from "@/components/ui/SectionAmbient";

export default function CTA() {
  const { ref: sectionRef, active: sectionActive } = useSectionActive();
  const [mode, setMode] = useState<"system" | "manual">("system");

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
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono">
            05 / System Philosophy
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono">
            Vantix Automation Solutions
          </span>
        </div>

        <div className="max-w-[1250px]">
          <p className="section-fade mb-8 text-xs font-mono uppercase tracking-[0.2em] text-white/40">
            Your next system starts here
          </p>

          <h2 className="display-heading text-[clamp(3.8rem,9vw,9rem)] font-medium leading-[0.78] tracking-[-0.075em]">
            <span className="display-line">LET&apos;S</span>
            <span className="display-line grey-word text-white/30">BUILD</span>
            <span className="display-line">SOMETHING</span>
            <span className="display-line">THAT RUNS.</span>
          </h2>
        </div>

        <div className="section-fade mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-md">
              <p className="text-sm leading-6 text-white/45">
                Tell us what is slowing your business down. We&apos;ll figure
                out what can be automated, what can be connected, and what
                should run without you.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>

                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/30">
                  Currently accepting Q3/Q4 projects
                </span>
              </div>
            </div>

            {/* Aesthetically Pleasing & Story-Relatable Telemetry Component */}
            <div className="w-full lg:max-w-[520px] border border-white/10 bg-white/[0.015] p-5 md:p-6 backdrop-blur-sm">
              {/* Header with Mode Toggle */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/40">
                  System Operating Mode
                </span>

                <div className="flex items-center gap-1 rounded border border-white/10 bg-black/50 p-1">
                  <button
                    type="button"
                    onClick={() => setMode("manual")}
                    className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.12em] transition-all cursor-pointer ${
                      mode === "manual"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    Manual
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("system")}
                    className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.12em] transition-all cursor-pointer ${
                      mode === "system"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    Vantix System
                  </button>
                </div>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 text-xs font-mono">
                  {mode === "system" ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                      <span className="text-emerald-400 font-medium tracking-[0.08em]">
                        AUTONOMOUS // 100% OPERATIONAL
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                      <span className="text-amber-400/90 font-medium tracking-[0.08em]">
                        MANUAL // HUMAN BOTTLENECK
                      </span>
                    </>
                  )}
                </span>

                <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.14em]">
                  {mode === "system" ? "LATENCY: < 450MS" : "LATENCY: ~ 18 HOURS"}
                </span>
              </div>

              {/* Ticker Stream */}
              <div className="space-y-2 font-mono text-[11px] bg-black/60 border border-white/5 p-4 rounded-sm min-h-[110px]">
                {mode === "system" ? (
                  <>
                    <div className="text-emerald-400/90 flex items-center justify-between">
                      <span>&gt; 14:02.01 // Inbound request captured</span>
                      <span className="text-[9px] text-white/30">WhatsApp API</span>
                    </div>
                    <div className="text-emerald-400/80 flex items-center justify-between">
                      <span>&gt; 14:02.04 // AI Agent classified intent</span>
                      <span className="text-[9px] text-white/30">Qualified</span>
                    </div>
                    <div className="text-white/80 flex items-center justify-between">
                      <span>&gt; 14:02.08 // CRM synced &amp; appointment booked</span>
                      <span className="text-[9px] text-emerald-400">✓ Done</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-amber-400/90 flex items-center justify-between">
                      <span>&gt; 14:02 // Unread lead waiting in WhatsApp</span>
                      <span className="text-[9px] text-amber-400/60">3.5 hr delay</span>
                    </div>
                    <div className="text-amber-400/70 flex items-center justify-between">
                      <span>&gt; 15:10 // Manual spreadsheet copy error</span>
                      <span className="text-[9px] text-white/30">Failed sync</span>
                    </div>
                    <div className="text-white/40 flex items-center justify-between">
                      <span>&gt; 17:45 // Follow-up forgotten</span>
                      <span className="text-[9px] text-red-400/80">Opportunity lost</span>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Footer Stat */}
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-[10px] font-mono text-white/40">
                <span>REPETITIVE TASK LOAD</span>
                <span className={mode === "system" ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {mode === "system" ? "0 MIN (FULLY AUTOMATED)" : "HIGH MANUAL OVERHEAD"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-fade mt-24 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/20">
            Vantix / Automation Solutions
          </span>

          <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/20">
            19.04° N / 72.88° E
          </span>
        </div>
      </div>
    </section>
  );
}