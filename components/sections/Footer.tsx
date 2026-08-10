export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050505] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <span className="text-2xl font-medium tracking-[-0.05em] text-white">
              VANTIX
            </span>

            <p className="mt-4 max-w-xs text-xs leading-5 text-white/30">
              Intelligent automation systems for modern business.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <span className="mb-4 block text-[9px] uppercase tracking-[0.18em] text-white/20">
              Navigate
            </span>

            <div className="flex flex-col gap-3">
              <a
                href="/#systems"
                className="w-fit text-xs text-white/45 transition-colors hover:text-white"
              >
                Systems
              </a>

              <a
                href="/#services"
                className="w-fit text-xs text-white/45 transition-colors hover:text-white"
              >
                Services
              </a>

              <a
                href="/#process"
                className="w-fit text-xs text-white/45 transition-colors hover:text-white"
              >
                Process
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="mb-4 block text-[9px] uppercase tracking-[0.18em] text-white/20">
              Contact
            </span>

            <div className="flex flex-col gap-3">
              <a
                href="/book"
                className="w-fit text-xs text-white/45 transition-colors hover:text-white"
              >
                Book a call
              </a>

              <a
                href="/contact"
                className="w-fit text-xs text-white/45 transition-colors hover:text-white"
              >
                Contact us
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <span className="mb-4 block text-[9px] uppercase tracking-[0.18em] text-white/20">
              Location
            </span>

            <span className="text-xs text-white/45">
              Mumbai, India
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-4 pt-6 text-[9px] uppercase tracking-[0.16em] text-white/20 md:flex-row">
          <span>© 2026 Vantix</span>

          <span>Automation Solutions</span>
        </div>
      </div>
    </footer>
  );
}