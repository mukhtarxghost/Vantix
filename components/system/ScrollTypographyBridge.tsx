"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

export default function ScrollTypographyBridge() {
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let ctx: gsap.Context | undefined;

    const setup = () => {
      const heroInners = document.querySelectorAll<HTMLElement>(
        "#hero-heading .hero-line-inner"
      );
      const servicesHeading = document.querySelector("#services-heading");
      const servicesLines =
        servicesHeading?.querySelectorAll<HTMLElement>(".services-line");

      if (!heroInners.length || !servicesLines?.length) return;

      ctx?.revert();
      ctx = gsap.context(() => {
        gsap.set(servicesLines, {
          opacity: 0,
          y: 50,
          rotateX: 10,
          transformOrigin: "50% 100%",
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        }).to(heroInners, {
          y: -40,
          z: -60,
          rotateX: -4,
          opacity: 0,
          stagger: 0.06,
          ease: "power2.in",
        });

        ScrollTrigger.create({
          trigger: "#services",
          start: "top 85%",
          end: "top 35%",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            servicesLines.forEach((line, i) => {
              const delay = i * 0.12;
              const lp = Math.max(0, Math.min(1, (p - delay) / (1 - delay)));
              gsap.set(line, {
                opacity: lp,
                y: 50 * (1 - lp),
                rotateX: 10 * (1 - lp),
                z: 30 * lp,
              });
            });
          },
        });
      });
    };

    window.addEventListener("vantix:hero-ready", setup, { once: true });
    const fallback = window.setTimeout(setup, 2500);

    return () => {
      window.removeEventListener("vantix:hero-ready", setup);
      window.clearTimeout(fallback);
      ctx?.revert();
    };
  }, [reducedMotion]);

  return null;
}
