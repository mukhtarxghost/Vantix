"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

export default function ScrollProgress() {
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const bar = document.createElement("div");
    bar.className = "scroll-progress-bar";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        }
      );
    });

    return () => {
      ctx.revert();
      bar.remove();
    };
  }, [reducedMotion]);

  return null;
}
