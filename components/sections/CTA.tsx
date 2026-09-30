"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const els = section.querySelectorAll(".cta-animate");
      gsap.from(els, {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] py-28 md:py-40"
    >
      <div className="container">
        <div className="max-w-[960px]">
          <p className="cta-animate mono-label mb-8 text-[var(--accent)]/80">
            Start here
          </p>

          <h2 className="cta-animate display-serif text-white">
            Build your
            <br />
            <span className="text-white/[0.18]">growth</span>
            system<span className="text-[var(--accent)]">.</span>
          </h2>
        </div>

        <div className="cta-animate mt-16 border-t border-white/[0.06] pt-10 md:mt-20 md:pt-12">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-md">
              <p className="text-[13px] leading-[1.75] text-white/35">
                Tell us how customers find you today — and what happens to
                them afterwards. We&apos;ll map where attention and enquiries
                leak, then build the system that stops it.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </span>
                <span className="mono-label text-white/[0.2]">
                  Currently accepting new projects
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 lg:w-auto">
              <Link
                href="/book"
                className="group flex items-center justify-between gap-6 border border-white bg-white px-7 py-5 text-black transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)]"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="mono-label text-black/45">
                    System discovery call
                  </span>
                  <span className="text-[13px] font-bold uppercase tracking-[0.14em]">
                    Book a call
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="mono-label hidden text-black/45 sm:inline">
                    15 min
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>

              <Link
                href="/contact"
                className="group flex items-center justify-between gap-6 border border-white/[0.10] bg-white/[0.02] px-7 py-4 text-white/50 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
                  Or submit a project brief
                </span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}