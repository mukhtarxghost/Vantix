"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
        element.style.clipPath = "inset(0 0 0 0)";

        observer.unobserve(element);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(90px)",
        clipPath: "inset(100% 0 0 0)",
        transition: `
          opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
          transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
          clip-path 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms
        `,
      }}
    >
      {children}
    </div>
  );
}