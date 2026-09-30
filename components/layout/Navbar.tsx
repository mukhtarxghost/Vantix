"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "System", href: "#system", index: "01" },
  { label: "Acquire", href: "#acquire", index: "02" },
  { label: "Convert", href: "#convert", index: "03" },
  { label: "Manage", href: "#manage", index: "04" },
  { label: "Automate", href: "#automation", index: "05" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#050505]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between lg:h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-0">
          <span className="text-[16px] font-bold tracking-[-0.06em]">VANTIX</span>
          <span className="text-[var(--accent)] text-[18px] font-light">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35 transition-colors hover:text-white"
            >
              <span className="mr-1.5 text-[8px] text-white/[0.14] transition-colors group-hover:text-[var(--accent)]/60">
                {link.index}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/book"
            className="chamfer-button flex items-center gap-2 bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black transition-all hover:bg-[var(--accent)]"
          >
            Book a call
            <ArrowUpRight size={11} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] text-white focus:outline-none lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`h-px w-5 bg-white transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-white transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 top-16 z-40 flex flex-col bg-[#050505] transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container flex flex-1 flex-col justify-center py-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline justify-between border-b border-white/[0.06] py-5"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <span className="flex items-baseline gap-4">
                <span className="mono-label text-white/[0.16]">{link.index}</span>
                <span className="text-3xl font-semibold tracking-[-0.04em] text-white/60 transition-colors group-hover:text-white">
                  {link.label}
                </span>
              </span>
              <ArrowUpRight
                size={18}
                className="text-white/[0.15] transition-colors group-hover:text-[var(--accent)]"
              />
            </a>
          ))}
        </div>

        <div className="container pb-10">
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="chamfer-button flex items-center justify-center gap-2 bg-white px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-black"
          >
            Book a call
            <ArrowUpRight size={12} strokeWidth={2.5} />
          </Link>
          <p className="mono-label mt-6 text-center text-white/[0.15]">
            Customer growth platform — automated end to end
          </p>
        </div>
      </div>
    </header>
  );
}
