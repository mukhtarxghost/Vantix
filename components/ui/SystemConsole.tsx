"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

const LINES = [
  "> vantix.init()",
  "> connecting CRM pipeline...",
  "> lead captured from WhatsApp",
  "> intent classified: booking",
  "> availability checked",
  "> workflow.triggered ✓",
  "> response dispatched",
  "> system.status: online",
];

export default function SystemConsole() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) {
      setLines(LINES);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let current = "";
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const target = LINES[lineIndex];
      if (!target) return;

      if (charIndex <= target.length) {
        current = target.slice(0, charIndex);
        setLines((prev) => {
          const next = [...prev];
          next[lineIndex] = current;
          return next;
        });
        charIndex++;
        timeout = setTimeout(type, 18 + Math.random() * 22);
      } else {
        lineIndex++;
        charIndex = 0;
        current = "";
        if (lineIndex < LINES.length) {
          timeout = setTimeout(type, 280);
        }
      }
    };

    timeout = setTimeout(type, 400);

    return () => clearTimeout(timeout);
  }, [reducedMotion]);

  useEffect(() => {
    if (!bodyRef.current || reducedMotion) return;
    gsap.from(bodyRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [reducedMotion]);

  return (
    <div ref={bodyRef} className="system-console">
      <div className="system-console-bar">
        <span className="system-console-dot" />
        <span>vantix-engine · live</span>
        <span className="system-console-status">connected</span>
      </div>
      <div className="system-console-body">
        {lines.map((line, i) => (
          <div key={i} className="system-console-line">
            {line}
            {i === lines.length - 1 && line && !reducedMotion && (
              <span className="system-console-cursor">▌</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
