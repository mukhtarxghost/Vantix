"use client";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b border-white/10 px-5 py-24 md:px-8 md:py-32"
    >
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-24 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            04 / Contact
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Start a conversation
          </span>
        </div>

        {/* Main CTA */}
        <div className="grid gap-16 md:grid-cols-[1fr_360px] md:items-end">
          <div>
            <p className="mb-8 text-xs uppercase tracking-[0.2em] text-white/35">
              Have a project in mind?
            </p>

            <h2 className="max-w-[1000px] text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.78] tracking-[-0.075em] text-white">
              LET&apos;S
              <br />
              TALK.
            </h2>
          </div>

          <div className="max-w-sm">
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

        {/* Technical strip */}
        <div className="mt-24 grid border-t border-white/10 md:grid-cols-3">
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
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}