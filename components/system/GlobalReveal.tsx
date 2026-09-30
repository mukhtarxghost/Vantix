"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";
import { LM_EASE } from "@/lib/motion";

export default function GlobalReveal() {
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Section header bar staggered children (skip scene sections)
      gsap.utils.toArray<HTMLElement>(".section-header-bar").forEach((bar) => {
        if (bar.closest("[id^='scene-']")) return;

        gsap.from(bar.children, {
          scrollTrigger: {
            trigger: bar,
            start: "top 94%",
            toggleActions: "play none none reverse",
          },
          y: 14,
          opacity: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: LM_EASE.out,
        });
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return null;
}
