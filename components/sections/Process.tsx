"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";
import { useSectionActive } from "@/hooks/useSectionActive";
import SectionAmbient from "@/components/ui/SectionAmbient";

const steps = [
  { number: "01", label: "DISCOVER", tagline: "Identify Friction" },
  { number: "02", label: "DESIGN", tagline: "Map Architecture" },
  { number: "03", label: "BUILD", tagline: "Connect & Automate" },
  { number: "04", label: "DEPLOY", tagline: "Run Autonomously" },
];

const details = [
  {
    number: "01",
    title: "DISCOVER",
    subtitle: "Messy Operations & Friction",
    description: "Understand where time, information, and decisions are getting stuck in repetitive manual tasks.",
    visualState: {
      tag: "UNSTRUCTURED INPUT",
      status: "High friction",
      color: "text-amber-400/80 border-amber-400/20 bg-amber-400/5",
      metrics: [
        { label: "Manual Delay", val: "4 - 24 hrs" },
        { label: "Lost Follow-ups", val: "~ 35%" },
        { label: "Human Overhead", val: "High" },
      ],
      nodes: ["Missed Messages", "Manual Spreadsheets", "Delayed Emails"],
    },
  },
  {
    number: "02",
    title: "DESIGN",
    subtitle: "Architecture & Logic",
    description: "Map the workflow, define API trigger rules, and structure how AI agents evaluate intent.",
    visualState: {
      tag: "SYSTEM ARCHITECTURE",
      status: "Logic Mapped",
      color: "text-blue-400/80 border-blue-400/20 bg-blue-400/5",
      metrics: [
        { label: "Logic Branches", val: "Structured" },
        { label: "API Triggers", val: "Defined" },
        { label: "Guardrails", val: "Strict" },
      ],
      nodes: ["Webhook Event", "Intent Classifier", "Rule Matrix"],
    },
  },
  {
    number: "03",
    title: "BUILD",
    subtitle: "API & Agent Integration",
    description: "Develop the automation connectors, train custom AI handlers, and rigorously test edge cases.",
    visualState: {
      tag: "SYSTEM INTEGRATION",
      status: "Compilation",
      color: "text-purple-400/80 border-purple-400/20 bg-purple-400/5",
      metrics: [
        { label: "Integrations", val: "Active" },
        { label: "Latency", val: "< 800ms" },
        { label: "Failover Rate", val: "0.0%" },
      ],
      nodes: ["AI Receptionist", "Database Sync", "CRM Gateway"],
    },
  },
  {
    number: "04",
    title: "DEPLOY",
    subtitle: "Autonomous Execution",
    description: "Put the system into production and refine continuous operation around live real-world usage.",
    visualState: {
      tag: "AUTONOMOUS SYSTEM",
      status: "100% Operational",
      color: "text-emerald-400/80 border-emerald-400/20 bg-emerald-400/5",
      metrics: [
        { label: "Availability", val: "24 / 7 / 365" },
        { label: "Manual Effort", val: "0 min" },
        { label: "System Health", val: "Optimal" },
      ],
      nodes: ["Instant Response", "Automated Booking", "Live Operations"],
    },
  },
];

export default function Process() {
  const { ref: sectionRef, active: sectionActive } = useSectionActive();
  const [active, setActive] = useState(0);
  const { reducedMotion } = useMotion();
  const progressRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);

  const currentDetail = details[active];

  useEffect(() => {
    sectionRef.current?.classList.toggle("is-section-active", sectionActive);
  }, [sectionActive, sectionRef]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 0.8,
        onUpdate: (self) => {
          const next = Math.min(
            details.length - 1,
            Math.floor(self.progress * details.length)
          );
          setActive(next);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, sectionRef]);

  useEffect(() => {
    if (reducedMotion) return;

    const progress = ((active + 1) / steps.length) * 100;
    const signalLeft = ((active + 0.5) / steps.length) * 100;

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (signalRef.current) {
      gsap.to(signalRef.current, {
        left: `${signalLeft}%`,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [active, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-motion relative overflow-hidden border-b border-white/10 px-5 py-24 md:px-8 md:py-32"
    >
      <SectionAmbient
        position="left"
        size="lg"
        showRing
        cycleLabels={["DISCOVER", "DESIGN", "BUILD", "DEPLOY"]}
      />

      <div className="legacy-section-grid pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="section-inner relative mx-auto max-w-[1600px]">
        <div className="section-header-bar section-fade mb-20 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono">
            04 / Process
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono">
            From Problem To System
          </span>
        </div>

        {/* Title & Concept */}
        <div className="relative min-h-[440px] overflow-hidden md:min-h-[500px]">
          <div className="section-fade absolute left-0 top-0">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
              Input / 01
            </span>
          </div>

          <div className="section-fade absolute bottom-0 right-0 text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
              Output / 01
            </span>
          </div>

          <div className="absolute left-0 top-[10%]">
            <p className="section-fade mb-4 text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
              From
            </p>

            <h2 className="display-heading text-[clamp(3.8rem,9vw,9rem)] font-medium leading-[0.76] tracking-[-0.08em] text-white">
              <span className="display-line">PROBLEM</span>
            </h2>
          </div>

          <div className="absolute bottom-[10%] right-0 text-right">
            <p className="section-fade mb-4 text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
              To
            </p>

            <h2 className="display-heading text-[clamp(3.8rem,9vw,9rem)] font-medium leading-[0.76] tracking-[-0.08em] text-white">
              <span className="display-line text-white/30">SYSTEM.</span>
            </h2>
          </div>

          {/* Interactive Timeline Connector */}
          <div className="absolute left-[8%] right-[8%] top-1/2 -translate-y-1/2">
            <div className="relative h-px bg-white/10">
              <div
                ref={progressRef}
                className="absolute left-0 top-0 h-px bg-white/60 transition-all"
                style={{ width: `${((active + 1) / steps.length) * 100}%` }}
              />

              <div
                ref={signalRef}
                className="process-signal absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                style={{
                  left: `${((active + 0.5) / steps.length) * 100}%`,
                }}
              />

              <div className="absolute inset-0 flex justify-between">
                {steps.map((step, index) => {
                  const isActive = index <= active;

                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className="group relative -translate-x-1/2 outline-none cursor-pointer"
                    >
                      <span
                        className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 ${
                          isActive
                            ? "border-white bg-white scale-125"
                            : "border-white/25 bg-black"
                        }`}
                      />

                      <span
                        className={`absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono uppercase tracking-[0.18em] transition-all duration-500 ${
                          isActive ? "text-white font-semibold" : "text-white/25"
                        }`}
                      >
                        {step.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Transformation Storytelling Display */}
        <div className="my-10 border border-white/10 bg-white/[0.015] p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className={`inline-block border px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.16em] ${currentDetail.visualState.color}`}>
                  {currentDetail.visualState.tag}
                </span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.14em]">
                  Phase {currentDetail.number} // {currentDetail.visualState.status}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em]">
                {currentDetail.title}: <span className="text-white/50">{currentDetail.subtitle}</span>
              </h3>
            </div>

            <p className="max-w-md text-xs leading-5 text-white/50">
              {currentDetail.description}
            </p>
          </div>

          {/* Phase Indicators */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {currentDetail.visualState.metrics.map((m) => (
              <div key={m.label} className="border border-white/5 bg-black/40 p-4">
                <span className="block text-[9px] font-mono uppercase tracking-[0.16em] text-white/30">
                  {m.label}
                </span>
                <span className="mt-1 block text-lg font-mono font-medium text-white/90">
                  {m.val}
                </span>
              </div>
            ))}
          </div>

          {/* Node Components */}
          <div className="mt-4 flex flex-wrap gap-2">
            {currentDetail.visualState.nodes.map((node) => (
              <span key={node} className="border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-white/60">
                ⚡ {node}
              </span>
            ))}
          </div>
        </div>

        {/* Step Cards Grid */}
        <div className="motion-panel border-t border-white/10">
          {details.map((step, index) => {
            const isActive = active === index;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group grid w-full border-b border-white/10 py-6 text-left transition-all duration-500 md:grid-cols-[80px_1fr_1fr] md:items-center md:py-8 cursor-pointer"
              >
                <span
                  className={`text-[9px] font-mono tracking-[0.15em] transition-colors duration-300 ${
                    isActive ? "text-white font-semibold" : "text-white/20"
                  }`}
                >
                  {step.number}
                </span>

                <span
                  className={`text-[clamp(1.8rem,3.5vw,3.5rem)] font-medium leading-none tracking-[-0.06em] transition-all duration-500 ${
                    isActive
                      ? "translate-x-2 text-white"
                      : "text-white/35"
                  }`}
                >
                  {step.title}
                </span>

                <span
                  className={`mt-3 max-w-sm text-xs leading-5 transition-colors duration-500 md:mt-0 md:justify-self-end ${
                    isActive ? "text-white/60 font-medium" : "text-white/25"
                  }`}
                >
                  {step.description}
                </span>
              </button>
            );
          })}
        </div>

        <div className="section-fade mt-8 flex items-center justify-between">
          <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/20">
            No unnecessary complexity
          </span>

          <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/20">
            Vantix System Process
          </span>
        </div>
      </div>
    </section>
  );
}