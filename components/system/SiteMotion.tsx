"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

export default function SiteMotion() {
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-motion").forEach((section) => {
        if (section.id === "hero-section") return;

        const inner = section.querySelector<HTMLElement>(".section-inner");
        if (!inner) return;

        gsap.fromTo(
          inner,
          { y: 40 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".section-convergence").forEach((section) => {
        const glow = section.querySelector(".section-ambient-glow");
        if (!glow) return;

        gsap.to(glow, {
          scale: 1.15,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center center",
            scrub: 1.2,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".motion-panel").forEach((panel) => {
        if (panel.closest(".workflow-engine")) return;

        gsap.from(panel, {
          scrollTrigger: {
            trigger: panel,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      const nav = document.querySelector<HTMLElement>(".site-nav");
      if (nav) {
        ScrollTrigger.create({
          start: "top -80",
          onUpdate: (self) => {
            const p = Math.min(1, self.scroll());
            nav.style.background = `rgba(0,0,0,${0.55 + p * 0.02})`;
            nav.style.borderColor = `rgba(255,255,255,${0.08 + p * 0.04})`;
          },
        });
      }

      gsap.from(".site-footer-inner > *", {
        scrollTrigger: {
          trigger: ".site-footer-inner",
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return null;
}
