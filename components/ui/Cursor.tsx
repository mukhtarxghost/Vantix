"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "@/components/system/MotionContext";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { setCursor } = useMotion();

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const mediaQuery = window.matchMedia("(pointer: fine)");

    if (!mediaQuery.matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    let animationFrame = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      setCursor(mouseX, mouseY);
      cursor.style.opacity = "1";
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest("a, button, input, textarea, select")) {
        cursor.classList.add("cursor-active");
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest("a, button, input, textarea, select")) {
        cursor.classList.remove("cursor-active");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrame);
      setCursor(-9999, -9999);
    };
  }, [setCursor]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="vantix-cursor"
    >
      <span className="vantix-cursor-dot" />
    </div>
  );
}