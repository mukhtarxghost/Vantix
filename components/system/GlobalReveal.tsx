"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";
import { LM_EASE } from "@/lib/motion";

export default function GlobalReveal() {
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".display-heading").forEach((heading) => {
        if (heading.closest("#hero-section")) return;
        if (heading.id === "services-heading") return;

        const lines = heading.querySelectorAll<HTMLElement>(".display-line");

        if (lines.length) {
          gsap.set(lines, { y: 44, opacity: 0 });

          gsap.to(lines, {
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.09,
            ease: LM_EASE.out,
          });
        }
      });

      gsap.utils.toArray<HTMLElement>(".section-fade").forEach((el) => {
        if (el.closest("#hero-section")) return;

        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: LM_EASE.out,
        });
      });

      gsap.utils.toArray<HTMLElement>(".section-header-bar").forEach((bar) => {
        gsap.from(bar.children, {
          scrollTrigger: {
            trigger: bar,
            start: "top 94%",
            toggleActions: "play none none reverse",
          },
          y: 18,
          opacity: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: LM_EASE.out,
        });
      });

      gsap.utils.toArray<HTMLElement>(".grey-word").forEach((word) => {
        const section = word.closest(".section-motion");
        if (!section) return;

        gsap.fromTo(
          word,
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 55%",
              end: "top 25%",
              scrub: 0.8,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return null;
}
