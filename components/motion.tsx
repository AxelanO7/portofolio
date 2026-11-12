"use client";

import { useEffect, useState } from "react";
import { STILL_EV, restoreStill, setStill, switchedOff } from "@/lib/motion";

/**
 * "Pause motion": stops everything that moves on its own (marquees, tickers, loops, the globe, the trailer),
 * the same state as the system setting prefers-reduced-motion. Remembered on this device. Used in the footer
 * and, as a control that only shows when focused, right after "Skip to content" (WCAG 2.2.2).
 */
export function MotionSwitch({ className, label = "pause motion" }: { className?: string; label?: string }) {
  const [off, setOff] = useState(false);
  useEffect(() => {
    restoreStill();
    setOff(switchedOff());
    const on = (e: Event) => setOff(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener(STILL_EV, on);
    return () => window.removeEventListener(STILL_EV, on);
  }, []);
  return (
    <button type="button" className={className} aria-pressed={off} onClick={() => setStill(!switchedOff())}>
      {label}
    </button>
  );
}
