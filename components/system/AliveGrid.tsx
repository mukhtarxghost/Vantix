"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { cursorStore } from "@/lib/cursorStore";
import { useMotion } from "@/components/system/MotionContext";

const MINIMAL_GRID_ROUTES = ["/book", "/contact"];

export default function AliveGrid() {
  const pathname = usePathname();
  const gridRef = useRef<HTMLDivElement>(null);
  const cursorGridRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const pulseHRef = useRef<HTMLDivElement>(null);
  const pulseVRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    const grid = gridRef.current;
    const sweep = sweepRef.current;
    if (!grid) return;

    if (reducedMotion) {
      grid.style.opacity = "1";
      return;
    }

    gsap.set(grid, { opacity: 0 });
    gsap.set(sweep, { opacity: 0.35, x: "-100%" });

    const tl = gsap.timeline({ delay: 0.05 });
    tl.to(grid, { opacity: 1, duration: 0.9, ease: "power2.out" });
    tl.fromTo(
      sweep,
      { x: "-100%", opacity: 0.4 },
      { x: "100%", opacity: 0, duration: 1.6, ease: "power3.inOut" },
      0
    );
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const grid = gridRef.current;
    const cursorGrid = cursorGridRef.current;
    let raf = 0;
    let scrollY = 0;
    let bgX = 0;
    let bgY = 0;
    let targetBgX = 0;
    let targetBgY = 0;

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const tick = () => {
      // Steady full grid — match locked reference look.
      if (grid) {
        const parallaxY = scrollY * 0.018;
        grid.style.opacity = "1";
        grid.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
      }

      const { x: cursorX, y: cursorY } = cursorStore.get();

      if (cursorGrid && cursorX > 0) {
        const nx = (cursorX / window.innerWidth - 0.5) * 2;
        const ny = (cursorY / window.innerHeight - 0.5) * 2;
        targetBgX = nx * 6;
        targetBgY = ny * 6;

        bgX += (targetBgX - bgX) * 0.06;
        bgY += (targetBgY - bgY) * 0.06;

        cursorGrid.style.setProperty("--cursor-x", `${cursorX}px`);
        cursorGrid.style.setProperty("--cursor-y", `${cursorY}px`);
        cursorGrid.style.backgroundPosition = `${bgX}px ${bgY}px`;
        cursorGrid.style.opacity = String(0.55 + Math.abs(nx) * 0.15);
      } else if (cursorGrid) {
        cursorGrid.style.opacity = "0";
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const pulseH = pulseHRef.current;
    const pulseV = pulseVRef.current;
    if (!pulseH || !pulseV) return;

    let timeout: ReturnType<typeof setTimeout>;

    const runPulse = () => {
      const isHorizontal = Math.random() > 0.45;

      if (isHorizontal) {
        gsap.set(pulseH, {
          top: `${10 + Math.random() * 80}%`,
          left: `${Math.random() * 30}%`,
          width: `${20 + Math.random() * 40}%`,
          opacity: 0,
          scaleX: 0,
        });
        gsap.to(pulseH, {
          opacity: 0.22,
          scaleX: 1,
          duration: 0.85,
          ease: "power2.inOut",
          onComplete: () => gsap.to(pulseH, { opacity: 0, duration: 0.4 }),
        });
      } else {
        gsap.set(pulseV, {
          left: `${10 + Math.random() * 80}%`,
          top: `${Math.random() * 30}%`,
          height: `${15 + Math.random() * 35}%`,
          opacity: 0,
          scaleY: 0,
        });
        gsap.to(pulseV, {
          opacity: 0.16,
          scaleY: 1,
          duration: 0.85,
          ease: "power2.inOut",
          onComplete: () => gsap.to(pulseV, { opacity: 0, duration: 0.4 }),
        });
      }

      timeout = setTimeout(runPulse, 5000 + Math.random() * 6000);
    };

    timeout = setTimeout(runPulse, 2000);
    return () => clearTimeout(timeout);
  }, [reducedMotion]);

  if (MINIMAL_GRID_ROUTES.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <div className="alive-grid-root" aria-hidden="true">
      <div ref={gridRef} className="alive-grid-base" />
      <div className="alive-grid-beam" />
      <div ref={cursorGridRef} className="alive-grid-cursor" />
      <div ref={sweepRef} className="alive-grid-sweep" />
      <div ref={pulseHRef} className="alive-grid-pulse alive-grid-pulse-h" />
      <div ref={pulseVRef} className="alive-grid-pulse alive-grid-pulse-v" />
    </div>
  );
}
