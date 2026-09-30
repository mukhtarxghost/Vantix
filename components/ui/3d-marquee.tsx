"use client";

import React from "react";
import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * ThreeDMarquee — a large, perspective-driven wall of product surfaces.
 *
 * Vantix adaptation: an isometric grid of React card nodes at natural
 * heights, drifting as a system (alternating column motion). Each card
 * sits at its own depth (translateZ) and responds individually to the
 * pointer with a subtle physical tilt — the hovered card lifts toward
 * the cursor like a physical interface surface. Hover is pointer-driven
 * via CSS custom properties (rAF-coalesced, no React state per frame).
 */

export interface WallCard {
  node: React.ReactNode;
  /** Base depth off the wall plane, px. Positive = toward viewer. */
  z?: number;
  /** Dimmed background treatment for far cards. */
  dim?: boolean;
}

const FINE_POINTER =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const REDUCED =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MAX_TILT = 3.1; // degrees — restrained

/* One card surface: lift + glow live in CSS (:hover), tilt in JS vars. */
function HoverCard({ card, surfaceId }: { card: WallCard; surfaceId: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef(0);

  const handleMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!FINE_POINTER || REDUCED || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el || raf.current) return;
    const { clientX, clientY } = e;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const px = (clientX - r.left) / r.width - 0.5;
      const py = (clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(py * MAX_TILT).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(-px * MAX_TILT).toFixed(2)}deg`);
    });
  }, []);

  const handleLeave = React.useCallback(() => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  React.useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div
      ref={ref}
      data-vx-card={surfaceId}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="vx-card"
      style={{ "--z": `${card.z ?? 0}px` } as React.CSSProperties}
    >
      {card.node}
      {card.dim && (
        <div className="pointer-events-none absolute inset-0 z-[4] rounded-[4px] bg-black/30" />
      )}
    </div>
  );
}

interface ThreeDMarqueeProps {
  /** Explicit column composition — each array renders as one drifting column */
  columns: WallCard[][];
  className?: string;
  /** Tailwind classes for the grid's vertical offset inside the canvas */
  gridTop?: string;
  /** Tailwind classes for the grid's horizontal offset inside the canvas */
  gridRight?: string;
}

export function ThreeDMarquee({
  columns,
  className,
  gridTop = "top-96",
  gridRight = "right-[50%]",
}: ThreeDMarqueeProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className={cn("relative block h-full w-full overflow-hidden", className)}>
        <div className="flex size-full items-center justify-center">
          <div className="size-[2160px] shrink-0 scale-[0.44] sm:scale-[0.64] lg:scale-100">
            <div
              style={{
                transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              }}
              className={cn(
                "transform-3d relative grid size-full origin-top-left grid-cols-5 gap-7",
                gridTop,
                gridRight,
              )}
            >
              {columns.map((subarray, colIndex) => (
                <motion.div
                  animate={{ y: colIndex % 2 === 0 ? 120 : -120 }}
                  transition={{
                    duration: colIndex % 2 === 0 ? 20 : 26,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  key={`${colIndex}-marquee`}
                  className="transform-3d flex flex-col items-start gap-7"
                >
                  <GridLineVertical className="-left-3" offset="80px" />
                  {subarray.map((card, cardIndex) => (
                    <div className="relative w-full transform-3d" key={`${colIndex}-${cardIndex}`}>
                      <GridLineHorizontal className="-top-3" offset="20px" />
                      <HoverCard card={card} surfaceId={`${colIndex}-${cardIndex}`} />
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#050505",
          "--color": "rgba(255, 255, 255, 0.13)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.13)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#050505",
          "--color": "rgba(255, 255, 255, 0.13)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.13)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        className,
      )}
    ></div>
  );
};
