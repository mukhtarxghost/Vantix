"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Systems", href: "/#systems" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const getHref = (href: string) => {
    if (pathname === "/") {
      return href.replace("/", "");
    }
    return href;
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-5 py-5 md:px-8">
      <nav className="site-nav mx-auto flex max-w-[1600px] items-center justify-between border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl md:px-6">
        <Link href="/" className="group flex items-center gap-1.5 text-lg font-semibold tracking-[-0.04em]">
          <span>VANTIX</span>
          <span className="text-white/30 transition-colors group-hover:text-emerald-400">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={getHref(link.href)}
              className="relative text-[11px] font-mono uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <Link
          href="/contact"
          className="group hidden items-center gap-2 border border-white/20 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.14em] transition-all hover:border-white hover:bg-white hover:text-black md:flex"
        >
          <span>Start a project</span>
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden p-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-[1600px] border border-white/10 bg-black/95 p-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.label}
                href={getHref(link.href)}
                onClick={() => setOpen(false)}
                className="text-xs font-mono uppercase tracking-[0.16em] text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 border border-white/20 px-4 py-3 text-center text-[11px] font-mono uppercase tracking-[0.14em] text-white bg-white/5"
            >
              <span>Start a project</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}