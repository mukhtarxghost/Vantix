"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Solutions", href: "#solutions" },
  { label: "Systems", href: "#systems" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-5 py-5 md:px-8">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl md:px-5">
        <a href="/" className="text-lg font-semibold tracking-[-0.04em]">
          VANTIX<span className="text-white/30">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="/contact"
          className="hidden items-center gap-2 border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition-all hover:bg-white hover:text-black md:flex"
        >
          Start a project
          <ArrowUpRight size={14} />
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-[1600px] border border-white/10 bg-black/95 p-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.12em] text-white/70"
              >
                {link.label}
              </a>
            ))}

            <a
              href="/contact"
              className="border border-white/20 px-4 py-3 text-center text-[11px] uppercase tracking-[0.14em]"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}