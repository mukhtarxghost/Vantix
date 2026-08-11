"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";
import { useSectionActive } from "@/hooks/useSectionActive";
import SectionAmbient from "@/components/ui/SectionAmbient";

const steps = [
  { number: "01", label: "IDENTIFY" },
  { number: "02", label: "MAP" },
  { number: "03", label: "BUILD" },
  { number: "04", label: "DEPLOY" },
];

const details = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "Understand where time, information, and decisions are getting stuck.",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "Map the workflow and define what should happen automatically.",
  },
  {
    number: "03",
    title: "BUILD",
    description:
      "Develop the automation, connect the tools, and test the system.",
  },
  {
    number: "04",
    title: "DEPLOY",
    description:
      "Put the system into production and refine it around real usage.",
  },
];

export default function Process() {
  const { ref: sectionRef, active: sectionActive } = useSectionActive();
  const [active, setActive] = useState(0);
  const { reducedMotion } = useMotion();
  const progressRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);

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
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            04 / Process
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            From Problem To System
          </span>
        </div>

        <div className="relative min-h-[620px] overflow-hidden md:min-h-[680px]">
          <div className="section-fade absolute left-0 top-0">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Input / 01
            </span>
          </div>

          <div className="section-fade absolute bottom-0 right-0 text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Output / 01
            </span>
          </div>

          <div className="absolute left-0 top-[13%]">
            <p className="section-fade mb-5 text-[10px] uppercase tracking-[0.2em] text-white/30">
              From
            </p>

            <h2 className="display-heading text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.76] tracking-[-0.08em] text-white">
              <span className="display-line">PROBLEM</span>
            </h2>
          </div>

          <div className="absolute bottom-[13%] right-0 text-right">
            <p className="section-fade mb-5 text-[10px] uppercase tracking-[0.2em] text-white/30">
              To
            </p>

            <h2 className="display-heading text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.76] tracking-[-0.08em] text-white">
              <span className="display-line">SYSTEM.</span>
            </h2>
          </div>

          <div className="absolute left-[8%] right-[8%] top-1/2 -translate-y-1/2">
            <div className="relative h-px bg-white/10">
              <div
                ref={progressRef}
                className="absolute left-0 top-0 h-px bg-white/60"
                style={{ width: `${((active + 1) / steps.length) * 100}%` }}
              />

              <div
                ref={signalRef}
                className="process-signal absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white"
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
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className="group relative -translate-x-1/2 outline-none"
                    >
                      <span
                        className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 ${
                          isActive
                            ? "border-white bg-white"
                            : "border-white/25 bg-black"
                        }`}
                      />

                      <span
                        className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.18em] transition-all duration-500 ${
                          isActive ? "text-white/55" : "text-white/20"
                        }`}
                      >
                        {step.label}
                      </span>

                      <span className="absolute left-1/2 top-8 -translate-x-1/2 text-[8px] tracking-[0.15em] text-white/15">
                        {step.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="section-fade absolute left-1/2 top-[68%] hidden -translate-x-1/2 text-center md:block">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
              Automating the distance between
            </p>

            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/40">
              problem / process / result
            </p>
          </div>
        </div>

        <div className="motion-panel border-t border-white/10">
          {details.map((step, index) => {
            const isActive = active === index;

            return (
              <button
                key={step.number}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group grid w-full border-b border-white/10 py-7 text-left transition-all duration-500 md:grid-cols-[80px_1fr_1fr] md:items-center md:py-9"
              >
                <span
                  className={`text-[9px] tracking-[0.15em] transition-colors duration-300 ${
                    isActive ? "text-white/50" : "text-white/20"
                  }`}
                >
                  {step.number}
                </span>

                <span
                  className={`text-[clamp(2rem,4vw,4rem)] font-medium leading-none tracking-[-0.06em] transition-all duration-500 ${
                    isActive
                      ? "translate-x-2 text-white"
                      : "text-white/40"
                  }`}
                  style={{
                    filter: isActive || reducedMotion ? "blur(0px)" : "blur(1px)",
                  }}
                >
                  {step.title}
                </span>

                <span
                  className={`mt-4 max-w-sm text-xs leading-5 transition-colors duration-500 md:mt-0 md:justify-self-end ${
                    isActive ? "text-white/45" : "text-white/20"
                  }`}
                >
                  {step.description}
                </span>
              </button>
            );
          })}
        </div>

        <div className="section-fade mt-8 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">
            No unnecessary complexity
          </span>

          <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">
            Vantix / 04
          </span>
        </div>
      </div>
    </section>
  );
}
