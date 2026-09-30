"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

export default function SiteMotion() {
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Section inner parallax (skip scene sections)
      gsap.utils.toArray<HTMLElement>(".section-motion").forEach((section) => {
        if (section.id === "hero-section" || section.id?.startsWith("scene-")) return;

        const inner = section.querySelector<HTMLElement>(".section-inner");
        if (!inner) return;

        gsap.fromTo(
          inner,
          { y: 30 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });

      // Section fade-in (skip scene sections)
      gsap.utils.toArray<HTMLElement>(".section-fade").forEach((el) => {
        if (el.closest("#hero-section") || el.closest("[id^='scene-']")) return;

        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      });

      // Display heading line reveals (skip scene sections)
      gsap.utils.toArray<HTMLElement>(".display-heading").forEach((heading) => {
        if (heading.closest("#hero-section") || heading.closest("[id^='scene-']")) return;

        const lines = heading.querySelectorAll<HTMLElement>(".display-line");
        if (lines.length) {
          gsap.set(lines, { y: 36, opacity: 0 });

          gsap.to(lines, {
            scrollTrigger: {
              trigger: heading,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
          });
        }
      });

      // Grey word scrub (skip scene sections)
      gsap.utils.toArray<HTMLElement>(".grey-word").forEach((word) => {
        if (word.closest("[id^='scene-']")) return;

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

      // Background grid slow parallax
      const grid = document.querySelector<HTMLElement>(".alive-grid-base");
      if (grid) {
        gsap.to(grid, {
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
          y: -100,
          ease: "none",
        });
      }

      // Footer staggered reveal (guard — footer may be absent on some routes)
      const footerInner = document.querySelector<HTMLElement>(".site-footer-inner");
      if (footerInner) {
        gsap.from(footerInner.children, {
          scrollTrigger: {
            trigger: footerInner,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return null;
}
