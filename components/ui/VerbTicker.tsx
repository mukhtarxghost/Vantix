"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

type Verb = {
  word: string;
  detail: string;
};

type VerbTickerProps = {
  verbs: Verb[];
  interval?: number;
};

export default function VerbTicker({ verbs, interval = 2400 }: VerbTickerProps) {
  const [index, setIndex] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);
  const detailRef = useRef<HTMLSpanElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion || !wordRef.current || !detailRef.current) return;

    let i = 0;
    const wordEl = wordRef.current;
    const detailEl = detailRef.current;

    const cycle = () => {
      i = (i + 1) % verbs.length;
      setIndex(i);

      gsap
        .timeline()
        .to([wordEl, detailEl], {
          opacity: 0,
          y: -8,
          duration: 0.22,
          ease: "power2.in",
        })
        .add(() => {
          wordEl.textContent = verbs[i].word;
          detailEl.textContent = verbs[i].detail;
        })
        .fromTo(
          [wordEl, detailEl],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.42, ease: "power3.out", stagger: 0.05 }
        );
    };

    const timer = setInterval(cycle, interval);
    return () => clearInterval(timer);
  }, [verbs, interval, reducedMotion]);

  const current = verbs[index];

  return (
    <div className="verb-ticker">
      <span className="verb-ticker-kicker">System verb</span>
      <span ref={wordRef} className="verb-ticker-word">
        {current.word}
      </span>
      <span ref={detailRef} className="verb-ticker-detail">
        {current.detail}
      </span>
    </div>
  );
}
