import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Solutions", href: "#solutions" },
  { label: "Systems", href: "#systems" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 pb-6 pt-16 md:px-8 md:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Top */}
        <div className="grid border-y border-white/10 md:grid-cols-[1fr_0.5fr]">
          <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
            <span className="text-2xl font-bold tracking-[-0.06em]">
              VANTIX.
            </span>

            <p className="mt-6 max-w-sm text-xs leading-5 text-white/35">
              Intelligent automation systems for businesses that want to move
              faster, operate smarter, and spend less time doing repetitive
              work.
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div className="border-r border-white/10 p-6 md:p-8">
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">
                Navigate
              </span>

              <div className="mt-6 flex flex-col gap-4">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-fit text-[10px] uppercase tracking-[0.14em] text-white/45 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">
                Connect
              </span>

              <div className="mt-6 flex flex-col gap-4">
                <a
                  href="/contact"
                  className="group flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/45 transition-colors hover:text-white"
                >
                  Start a project
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

                <a
                  href="mailto:hello@vantix.work"
                  className="w-fit text-[10px] tracking-[0.08em] text-white/30 transition-colors hover:text-white"
                >
                  hello@vantix.work
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-4 py-5 md:flex-row md:items-center">
          <span className="text-[9px] uppercase tracking-[0.16em] text-white/20">
            © {new Date().getFullYear()} Vantix Automation Solutions
          </span>

          <div className="flex items-center gap-6">
            <span className="text-[9px] uppercase tracking-[0.16em] text-white/20">
              19.04° N / 72.88° E
            </span>

            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Systems online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}