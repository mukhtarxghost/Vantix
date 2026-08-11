"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

type StatCounterProps = {
  value: string;
  label: string;
};

function parseValue(value: string) {
  if (value.includes("/")) return { animate: false as const, display: value };
  const pct = value.match(/^(\d+(?:\.\d+)?)(%)$/);
  if (pct) {
    return {
      animate: true as const,
      prefix: "",
      num: parseFloat(pct[1]),
      suffix: "%",
    };
  }
  const match = value.match(/^([<]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { animate: false as const, display: value };
  return {
    animate: true as const,
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3],
  };
}

export default function StatCounter({ value, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const { reducedMotion } = useMotion();
  const parsed = parseValue(value);

  useEffect(() => {
    const el = ref.current;
    const numEl = numRef.current;
    if (!el || !parsed.animate || reducedMotion) return;
    if (!numEl) return;

    const obj = { val: 0 };
    const p = parsed;

    gsap.to(obj, {
      val: p.num,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        const display =
          p.num % 1 !== 0
            ? obj.val.toFixed(1)
            : Math.round(obj.val).toString();
        numEl.textContent = `${p.prefix}${display}${p.suffix}`;
      },
    });
  }, [parsed, reducedMotion]);

  return (
    <div ref={ref} className="stat-counter border-b border-white/10 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="text-3xl font-medium tracking-[-0.05em]">
        {parsed.animate ? (
          <span ref={numRef}>{parsed.prefix}0{parsed.suffix}</span>
        ) : (
          parsed.display
        )}
      </div>
      <div className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/25">
        {label}
      </div>
    </div>
  );
}
