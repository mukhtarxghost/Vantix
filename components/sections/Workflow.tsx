"use client";

const nodes = [
  { id: "01", label: "INCOMING LEAD", x: "8%", y: "50%" },
  { id: "02", label: "AI AGENT", x: "32%", y: "50%" },
  { id: "03", label: "QUALIFY", x: "56%", y: "25%" },
  { id: "04", label: "ROUTE", x: "56%", y: "75%" },
  { id: "05", label: "CRM", x: "80%", y: "25%" },
  { id: "06", label: "WHATSAPP", x: "80%", y: "75%" },
];

export default function Workflow() {
  return (
    <section
      id="systems"
      className="relative overflow-hidden border-b border-white/10 px-5 py-24 md:px-8 md:py-32"
    >
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-20 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            01 / Systems
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Automation Infrastructure
          </span>
        </div>

        {/* Statement */}
        <div className="mb-24">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
            What we build
          </p>

          <h2 className="max-w-[1100px] text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.82] tracking-[-0.07em]">
            BUSINESS
            <br />
            <span className="text-white/30">WITHOUT</span>
            <br />
            THE BUSYWORK.
          </h2>
        </div>

        {/* System */}
        <div className="border border-white/10 bg-white/[0.015]">
          {/* System Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
              Vantix Automation Engine
            </span>

            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                System Online
              </span>
            </div>
          </div>

          {/* Desktop Diagram */}
          <div className="relative hidden h-[560px] overflow-hidden md:block">
            {/* Ambient center glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[100px]" />

            {/* Connection system */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1000 560"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="flowGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <linearGradient
                  id="flowGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="45%" stopColor="white" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>

                {/* Main */}
                <path
                  id="flow-main"
                  d="M 168 280 L 232 280"
                  fill="none"
                />

                {/* Upper branch */}
                <path
                  id="flow-upper"
                  d="M 408 280 L 560 140"
                  fill="none"
                />

                {/* Lower branch */}
                <path
                  id="flow-lower"
                  d="M 408 280 L 560 420"
                  fill="none"
                />

                {/* Upper execution */}
                <path
                  id="flow-crm"
                  d="M 648 140 L 712 140"
                  fill="none"
                />

                {/* Lower execution */}
                <path
                  id="flow-whatsapp"
                  d="M 648 420 L 712 420"
                  fill="none"
                />
              </defs>

              {/* Static connections */}
              <path
                d="M 168 280 L 232 280"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1"
              />

              <path
                d="M 408 280 L 560 140"
                stroke="rgba(255,255,255,0.13)"
                strokeWidth="1"
              />

              <path
                d="M 408 280 L 560 420"
                stroke="rgba(255,255,255,0.13)"
                strokeWidth="1"
              />

              <path
                d="M 648 140 L 712 140"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1"
              />

              <path
                d="M 648 420 L 712 420"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1"
              />

              {/* Animated signal — incoming */}
              <circle
                r="2.5"
                fill="white"
                filter="url(#flowGlow)"
              >
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin="0s"
                  rotate="auto"
                >
                  <mpath href="#flow-main" />
                </animateMotion>
              </circle>

              {/* Animated signal — upper branch */}
              <circle
                r="2"
                fill="white"
                filter="url(#flowGlow)"
              >
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin="0.65s"
                  rotate="auto"
                >
                  <mpath href="#flow-upper" />
                </animateMotion>
              </circle>

              {/* Animated signal — lower branch */}
              <circle
                r="2"
                fill="white"
                filter="url(#flowGlow)"
              >
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin="0.65s"
                  rotate="auto"
                >
                  <mpath href="#flow-lower" />
                </animateMotion>
              </circle>

              {/* Animated signal — CRM */}
              <circle
                r="2"
                fill="white"
                filter="url(#flowGlow)"
              >
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin="1.25s"
                  rotate="auto"
                >
                  <mpath href="#flow-crm" />
                </animateMotion>
              </circle>

              {/* Animated signal — WhatsApp */}
              <circle
                r="2"
                fill="white"
                filter="url(#flowGlow)"
              >
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin="1.25s"
                  rotate="auto"
                >
                  <mpath href="#flow-whatsapp" />
                </animateMotion>
              </circle>
            </svg>

            {/* Nodes */}
            {nodes.map((node, index) => (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: node.x,
                  top: node.y,
                }}
              >
                <div
                  className="workflow-node group relative w-44 border border-white/15 bg-black p-4"
                  style={{
                    animationDelay: `${index * 0.65}s`,
                    animationName: "nodeActivation",
                    animationDuration: "2.8s",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                  }}
                >
                  {/* Processing glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-white/[0.025]" />
                  </div>

                  <div className="relative mb-5 flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.15em] text-white/25">
                      {node.id}
                    </span>

                    {/* Line indicator */}
                    <span
                      className="workflow-node-dot block h-px w-5 bg-white/30"
                      style={{
                        animationName: "workflowLinePulse",
                        animationDuration: "2.8s",
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                        animationDelay: `${index * 0.65}s`,
                      }}
                    />
                  </div>

                  <span className="relative text-[10px] uppercase tracking-[0.16em] text-white/65">
                    {node.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex flex-col divide-y divide-white/10 md:hidden">
            {nodes.map((node, index) => (
              <div
                key={node.id}
                className="flex items-center justify-between px-5 py-6"
              >
                <span className="text-[9px] tracking-[0.15em] text-white/25">
                  {node.id}
                </span>

                <span className="text-[10px] uppercase tracking-[0.16em] text-white/65">
                  {node.label}
                </span>

                {/* Line indicator */}
                <span
                  className="workflow-mobile-line block h-px w-5 bg-white/40"
                  style={{
                    animationName: "workflowLinePulse",
                    animationDuration: "2.8s",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    animationDelay: `${index * 0.45}s`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* System Footer */}
          <div className="grid border-t border-white/10 md:grid-cols-3">
            <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
              <span className="block text-[9px] uppercase tracking-[0.15em] text-white/25">
                Trigger
              </span>

              <span className="mt-2 block text-xs text-white/60">
                Incoming request
              </span>
            </div>

            <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
              <span className="block text-[9px] uppercase tracking-[0.15em] text-white/25">
                Intelligence
              </span>

              <span className="mt-2 block text-xs text-white/60">
                AI decision engine
              </span>
            </div>

            <div className="p-5">
              <span className="block text-[9px] uppercase tracking-[0.15em] text-white/25">
                Execution
              </span>

              <span className="mt-2 block text-xs text-white/60">
                Automated action
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Node pulse animation */}
      <style jsx>{`
        @keyframes workflowLinePulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scaleX(1);
          }

          12% {
            opacity: 1;
            transform: scaleX(1.45);
          }

          24% {
            opacity: 0.35;
            transform: scaleX(1);
          }
        }

        @keyframes nodeActivation {
          0%,
          100% {
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }

          12% {
            border-color: rgba(255, 255, 255, 0.42);
            box-shadow: 0 0 28px rgba(255, 255, 255, 0.045);
          }

          24% {
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .workflow-node,
          .workflow-node-dot,
          .workflow-mobile-line {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}