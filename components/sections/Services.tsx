"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "AI RECEPTIONISTS",
    description:
      "Intelligent agents that handle conversations, answer questions, qualify customers, and book appointments around the clock.",
    tags: ["VOICE", "WHATSAPP", "WEB"],
  },
  {
    number: "02",
    title: "WORKFLOW AUTOMATION",
    description:
      "Connect the tools your business already uses and turn repetitive operations into autonomous workflows.",
    tags: ["OPERATIONS", "INTEGRATIONS", "AUTOMATION"],
  },
  {
    number: "03",
    title: "LEAD SYSTEMS",
    description:
      "Capture, qualify, route, and follow up with every lead automatically so opportunities don't disappear.",
    tags: ["CRM", "LEADS", "FOLLOW-UP"],
  },
  {
    number: "04",
    title: "WHATSAPP SYSTEMS",
    description:
      "Build business conversations that do more than send messages — they collect information, trigger actions, and move customers forward.",
    tags: ["WHATSAPP", "AI", "API"],
  },
  {
    number: "05",
    title: "CUSTOM AI SYSTEMS",
    description:
      "Purpose-built AI infrastructure designed around the exact processes, data, and bottlenecks inside your business.",
    tags: ["AI", "DATA", "CUSTOM"],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="solutions"
      className="relative overflow-hidden border-b border-white/10 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-20 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            02 / Solutions
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Built around your business
          </span>
        </div>

        {/* Intro */}
        <div className="mb-20 grid gap-10 md:grid-cols-[1fr_0.5fr]">
          <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.82] tracking-[-0.07em]">
            AUTOMATE
            <br />
            <span className="text-white/30">WHAT</span>
            <br />
            MATTERS.
          </h2>

          <div className="flex items-end">
            <p className="max-w-sm text-sm leading-6 text-white/45">
              We combine AI, APIs, messaging, databases, and workflow
              automation to turn manual processes into systems that run.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="border-t border-white/10">
          {services.map((service, index) => {
            const isActive = active === index;

            return (
              <button
                key={service.number}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group block w-full border-b border-white/10 text-left"
              >
                <div
                  className={`grid transition-all duration-500 md:grid-cols-[80px_1fr_1fr_80px] md:items-center ${
                    isActive ? "py-8 md:py-10" : "py-6 md:py-7"
                  }`}
                >
                  {/* Number */}
                  <span
                    className={`text-[10px] tracking-[0.15em] transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/25"
                    }`}
                  >
                    {service.number}
                  </span>

                  {/* Title */}
                  <div className="mt-3 md:mt-0">
                    <span
                      className={`text-[clamp(1.6rem,3vw,3rem)] font-medium tracking-[-0.04em] transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/45"
                      }`}
                    >
                      {service.title}
                    </span>

                    {/* Mobile description */}
                    <p className="mt-4 max-w-md text-xs leading-5 text-white/40 md:hidden">
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2 md:hidden">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/10 px-2 py-1 text-[8px] tracking-[0.14em] text-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Desktop description */}
                  <div className="hidden md:block">
                    <p
                      className={`max-w-md text-xs leading-5 transition-all duration-500 ${
                        isActive
                          ? "translate-x-0 text-white/55 opacity-100"
                          : "translate-x-3 text-white/0 opacity-0"
                      }`}
                    >
                      {service.description}
                    </p>

                    <div
                      className={`mt-5 flex gap-2 transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/10 px-2 py-1 text-[8px] tracking-[0.14em] text-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden justify-end md:flex">
                    <span
                      className={`flex h-10 w-10 items-center justify-center border transition-all duration-300 ${
                        isActive
                          ? "border-white/30 bg-white text-black"
                          : "border-white/10 text-white/25"
                      }`}
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/25">
            No two systems are built the same.
          </span>

          <a
            href="/contact"
            className="group flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.16em]"
          >
            Discuss your workflow
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}