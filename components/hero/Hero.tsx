"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cursorStore } from "@/lib/cursorStore";
import { useMotion } from "@/components/system/MotionContext";
import HeroOrb from "@/components/ui/HeroOrb";
import { LM_EASE, LM_STAGGER } from "@/lib/motion";

const SYSTEM_LABELS = [
  "OPERATIONS",
  "AUTOMATION",
  "SYSTEMS",
  "DEPLOYMENT",
  "INTEGRATION",
];

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const orbWrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { reducedMotion } = useMotion();

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    const floatLayer = floatRef.current;
    const orbWrap = orbWrapRef.current;
    const label = labelRef.current;

    if (!stage || !tilt || !floatLayer || reducedMotion) {
      window.dispatchEvent(new CustomEvent("vantix:hero-ready"));
      return;
    }

    const inners = stage.querySelectorAll<HTMLElement>(".hero-line-inner");
    const fades = stage.querySelectorAll<HTMLElement>(".hero-fade");

    let labelIndex = 0;
    let labelTimer: ReturnType<typeof setInterval> | undefined;
    let motionRaf = 0;
    let ready = false;

    const ctx = gsap.context(() => {
      gsap.set(inners, { y: 52, opacity: 0 });
      gsap.set(fades, { y: 28, opacity: 0 });
      gsap.set(orbWrap, { scale: 0.82, opacity: 0 });

      const intro = gsap.timeline({
        delay: 0.08,
        onComplete: () => {
          ready = true;
          window.dispatchEvent(new CustomEvent("vantix:hero-ready"));

          gsap.to(floatLayer, {
            y: -8,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          labelTimer = setInterval(() => {
            if (!label) return;
            labelIndex = (labelIndex + 1) % SYSTEM_LABELS.length;
            gsap
              .timeline()
              .to(label, { opacity: 0, y: -6, duration: 0.2, ease: "power2.in" })
              .add(() => {
                label.textContent = SYSTEM_LABELS[labelIndex];
              })
              .fromTo(
                label,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.38, ease: LM_EASE.out }
              );
          }, 2600);
        },
      });

      intro
        .to(
          orbWrap,
          { scale: 1, opacity: 1, duration: 1.3, ease: LM_EASE.entrance },
          0
        )
        .to(
          inners,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: LM_STAGGER,
            ease: LM_EASE.out,
          },
          0.12
        )
        .to(
          fades,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.07,
            ease: LM_EASE.out,
          },
          "-=0.65"
        );

      gsap.to(stage, {
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -50,
        ease: "none",
      });

      gsap.to(orbWrap, {
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
        y: -30,
        ease: "none",
      });
    }, stage);

    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (event: MouseEvent) => {
      cursorStore.set(event.clientX, event.clientY);
    };

    const motionTick = () => {
      if (ready) {
        const { x, y } = cursorStore.get();

        if (x > 0) {
          const nx = (x / window.innerWidth - 0.5) * 2;
          const ny = (y / window.innerHeight - 0.5) * 2;
          targetRotY = nx * 3.5;
          targetRotX = -ny * 2.2;
        } else {
          targetRotX = 0;
          targetRotY = 0;
        }

        rotX += (targetRotX - rotX) * 0.05;
        rotY += (targetRotY - rotY) * 0.05;

        tilt.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      motionRaf = requestAnimationFrame(motionTick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    motionRaf = requestAnimationFrame(motionTick);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(motionRaf);
      if (labelTimer) clearInterval(labelTimer);
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero-section"
      className="section-motion relative flex min-h-[100svh] flex-col overflow-hidden border-b border-white/10 px-5 pb-8 pt-28 md:px-8 md:pb-10"
    >
      <div
        className="hero-top-vignette pointer-events-none absolute inset-x-0 top-0 h-full"
        aria-hidden="true"
      />
      <div className="hero-light-beam pointer-events-none absolute inset-0" aria-hidden="true" />

      <div
        ref={orbWrapRef}
        className="hero-orb-container pointer-events-none relative z-[1] mx-auto mt-4 flex flex-1 flex-col items-center justify-center md:mt-0"
        aria-hidden="true"
      >
        <HeroOrb>
          <span className="hero-ring-label-kicker">Active</span>
          <span ref={labelRef} className="hero-ring-label-word">
            OPERATIONS
          </span>
        </HeroOrb>
        <div className="hero-scroll-cue pointer-events-none mt-8 flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.28em] text-white/30">
            Scroll
          </span>
          <span className="hero-scroll-line" />
        </div>
      </div>

      <div
        ref={stageRef}
        className="hero-stage relative mx-auto w-full max-w-[1600px] shrink-0"
      >
        <div className="hero-fade mb-8 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Vantix / Automation Solutions
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            19.04° N / 72.88° E
          </span>
        </div>

        <div className="relative max-w-[1200px]">
          <p className="hero-fade mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
            Intelligent systems for modern business
          </p>

          <div ref={tiltRef} className="hero-tilt">
            <div ref={floatRef} className="hero-float">
              <div
                id="hero-heading"
                className="hero-heading-3d text-[clamp(3.8rem,9.5vw,9.5rem)] font-medium leading-[0.78] tracking-[-0.075em]"
              >
                <div className="hero-line overflow-hidden">
                  <span className="hero-line-inner block">WE BUILD</span>
                </div>
                <div className="hero-line overflow-hidden text-white/35">
                  <span className="hero-line-inner hero-line-accent block">
                    SYSTEMS
                  </span>
                </div>
                <div className="hero-line overflow-hidden">
                  <span className="hero-line-inner block">THAT WORK.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-fade mt-8 flex flex-col justify-between gap-8 border-t border-white/10 pt-6 md:flex-row md:items-end">
          <p className="max-w-md text-sm leading-6 text-white/45">
            Vantix designs and deploys intelligent automation systems that
            eliminate repetitive work and keep businesses moving.
          </p>
          <a
            href="/contact"
            className="group flex w-fit items-center gap-4 text-xs uppercase tracking-[0.16em]"
          >
            <span className="border-b border-white pb-2">Start a project</span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
