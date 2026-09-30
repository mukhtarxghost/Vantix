import { ArrowUpRight } from "lucide-react";

const system = [
  { label: "Acquire", href: "#acquire" },
  { label: "Convert", href: "#convert" },
  { label: "Manage", href: "#manage" },
  { label: "Automate", href: "#automation" },
];

const products = [
  { label: "AI Voice Receptionist", href: "#convert" },
  { label: "Customer Database", href: "#manage" },
  { label: "Personalised Automation", href: "#automation" },
];

const company = [
  { label: "The System", href: "#system" },
  { label: "Book a call", href: "/book" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] py-16 md:py-20">
      <div className="site-footer-inner container">
        {/* Top */}
        <div className="grid border-b border-white/[0.06] md:grid-cols-[1fr_2.5fr]">
          {/* Brand */}
          <div className="flex flex-col justify-between border-b border-white/[0.06] p-6 md:border-b-0 md:border-r md:border-white/[0.06] md:p-8">
            <div>
              <span className="text-lg font-bold tracking-[-0.06em]">VANTIX</span>
              <span className="text-[var(--accent)]">.</span>
            </div>
            <p className="mt-10 max-w-xs text-[12px] leading-[1.75] text-white/25 md:mt-16">
              The system between a business and its customers. Acquire,
              convert, manage, and grow — in one platform.
            </p>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3">
            <div className="border-r border-white/[0.06] p-6 md:p-8">
              <span className="mono-label text-white/[0.15]">System</span>
              <div className="mt-5 flex flex-col gap-3.5">
                {system.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[11px] text-white/25 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-r border-white/[0.06] p-6 md:p-8">
              <span className="mono-label text-white/[0.15]">Products</span>
              <div className="mt-5 flex flex-col gap-3.5">
                {products.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[11px] text-white/25 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <span className="mono-label text-white/[0.15]">Company</span>
              <div className="mt-5 flex flex-col gap-3.5">
                {company.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-1.5 text-[11px] text-white/25 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={10}
                      className="opacity-0 transition-opacity hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-5 py-7 md:flex-row md:items-center">
          <span className="mono-label text-white/[0.15]">
            &copy; {new Date().getFullYear()} Vantix. All rights reserved.
          </span>

          <div className="flex items-center gap-7">
            <a
              href="#"
              className="mono-label text-white/[0.15] transition-colors hover:text-white/35"
            >
              Privacy
            </a>
            <a
              href="#"
              className="mono-label text-white/[0.15] transition-colors hover:text-white/35"
            >
              Terms
            </a>
            <span className="flex items-center gap-2.5 mono-label text-white/[0.15]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              Systems online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
