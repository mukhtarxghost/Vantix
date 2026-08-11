"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cursorStore } from "@/lib/cursorStore";

type MotionContextValue = {
  setCursor: (x: number, y: number) => void;
  reducedMotion: boolean;
};

const MotionContext = createContext<MotionContextValue>({
  setCursor: () => {},
  reducedMotion: false,
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  const setCursor = useCallback((x: number, y: number) => {
    cursorStore.set(x, y);
  }, []);

  const value = useMemo(
    () => ({
      setCursor,
      reducedMotion,
    }),
    [setCursor, reducedMotion]
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}
