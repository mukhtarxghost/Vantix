"use client";

import { useState } from "react";

const solutions = [
  {
    id: "01",
    title: "AI RECEPTION",
    short: "Inbound conversations",
    description:
      "AI agents that handle calls and messages, answer questions, qualify requests, and move the right conversations forward.",
    flow: ["INBOUND", "UNDERSTAND", "QUALIFY", "ROUTE"],
  },
  {
    id: "02",
    title: "LEAD SYSTEMS",
    short: "Capture → conversion",
    description:
      "Capture leads automatically, qualify them against your rules, and trigger the right follow-up without relying on manual work.",
    flow: ["CAPTURE", "QUALIFY", "FOLLOW UP", "CONVERT"],
  },
  {
    id: "03",
    title: "OPERATIONS",
    short: "Remove repetitive work",
    description:
      "Connect the tools your team already uses and automate the repetitive processes sitting between them.",
    flow: ["TRIGGER", "PROCESS", "SYNC", "EXECUTE"],
  },
  {
    id: "04",
    title: "CUSTOM SYSTEMS",
    short: "Built around your business",
    description:
      "When the workflow does not fit a template, we design and build an automation system around the way your business actually operates.",
    flow: ["DISCOVER", "ARCHITECT", "BUILD", "DEPLOY"],
  },
];

export default function Solutions() {
  const [active, setActive] = useState(0);

  const current = solutions[active];

  return (
    <section
      id="solutions"
      className="relative overflow-hidden border-b border-white/10 bg-[#050505] px-5 py-24 md:px-8 md:py-32"
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-20 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            02 / Solutions
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Automation Systems
          </span>
        </div>

        {/* Intro */}
        <div className="mb-20 grid gap-10 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <h2 className="max-w-[1100px] text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.8] tracking-[-0.075em] text-white">
            LESS
            <br />
            <span className="text-white/30">MANUAL.</span>
            <br />
            MORE SYSTEM.
          </h2>

          <div className="max-w-sm pb-2">
            <p className="text-sm leading-6 text-white/45">
              We build automation around the work your business should not
              have to keep doing manually.
            </p>
          </div>
        </div>

        {/* Solution interface */}
        <div className="border border-white/10">
          {/* Top status bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Vantix / Capability Matrix
            </span>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                Systems Available
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left — solutions */}
            <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
              {solutions.map((solution, index) => {
                const isActive = index === active;

                return (
                  <button
                    key={solution.id}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`group relative flex w-full items-center justify-between border-b border-white/10 px-5 py-7 text-left transition-all duration-300 last:border-b-0 md:px-7 ${
                      isActive ? "bg-white/[0.025]" : "hover:bg-white/[0.015]"
                    }`}
                  >
                    {/* Active indicator */}
                    <span
                      className={`absolute left-0 top-0 h-full w-px transition-all duration-300 ${
                        isActive ? "bg-white" : "bg-transparent"
                      }`}
                    />

                    <div className="flex items-center gap-6">
                      <span
                        className={`text-[9px] tracking-[0.2em] transition-colors ${
                          isActive ? "text-white/60" : "text-white/20"
                        }`}
                      >
                        {solution.id}
                      </span>

                      <div>
                        <span
                          className={`block text-[clamp(1.7rem,3vw,3rem)] font-medium leading-none tracking-[-0.05em] transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-white/30 group-hover:text-white/55"
                          }`}
                        >
                          {solution.title}
                        </span>

                        <span
                          className={`mt-2 block text-[9px] uppercase tracking-[0.16em] transition-colors ${
                            isActive ? "text-white/40" : "text-white/15"
                          }`}
                        >
                          {solution.short}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-lg transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-white/70"
                          : "-translate-x-2 text-white/15 group-hover:text-white/40"
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right — active system */}
            <div className="relative min-h-[430px] overflow-hidden p-6 md:p-10">
              {/* Subtle center glow */}
              <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-white/[0.025] blur-[100px]" />

              <div className="relative flex h-full flex-col justify-between">
                {/* System number */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                      Active system
                    </span>

                    <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/50">
                      {current.id} / {current.short}
                    </div>
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                    Online
                  </span>
                </div>

                {/* Description */}
                <div className="py-16">
                  <p className="max-w-[600px] text-[clamp(1.5rem,3vw,2.7rem)] font-light leading-[1.05] tracking-[-0.04em] text-white/75">
                    {current.description}
                  </p>
                </div>

                {/* Flow */}
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                      System flow
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">
                      04 stages
                    </span>
                  </div>

                  <div className="grid grid-cols-4 border border-white/10">
                    {current.flow.map((stage, index) => (
                      <div
                        key={stage}
                        className={`relative min-h-[90px] border-white/10 p-3 ${
                          index !== current.flow.length - 1
                            ? "border-r"
                            : ""
                        }`}
                      >
                        <span className="block text-[8px] tracking-[0.15em] text-white/20">
                          0{index + 1}
                        </span>

                        <span className="mt-5 block text-[9px] uppercase tracking-[0.12em] text-white/55">
                          {stage}
                        </span>

                        {index !== current.flow.length - 1 && (
                          <span className="absolute right-[-4px] top-1/2 z-10 -translate-y-1/2 text-[8px] text-white/30">
                            →
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div className="grid border-t border-white/10 md:grid-cols-3">
            <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
              <span className="block text-[9px] uppercase tracking-[0.15em] text-white/20">
                Input
              </span>

              <span className="mt-2 block text-xs text-white/50">
                Business workflow
              </span>
            </div>

            <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
              <span className="block text-[9px] uppercase tracking-[0.15em] text-white/20">
                Intelligence
              </span>

              <span className="mt-2 block text-xs text-white/50">
                Rules + AI
              </span>
            </div>

            <div className="p-5">
              <span className="block text-[9px] uppercase tracking-[0.15em] text-white/20">
                Output
              </span>

              <span className="mt-2 block text-xs text-white/50">
                Automated execution
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}