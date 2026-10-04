"use client";

import { useEffect, useState } from "react";

export type Tier = "high" | "low" | "off";

export interface Capability {
  ready: boolean; // resolved on client (avoids SSR mismatch)
  tier: Tier; // high = full WebGL, low = light 2D fallback, off = no webgl
  reduced: boolean; // prefers-reduced-motion
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      c.getContext("webgl2") ||
      c.getContext("webgl") ||
      c.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function useCapability(): Capability {
  const [cap, setCap] = useState<Capability>({
    ready: false,
    tier: "high",
    reduced: false,
  });

  useEffect(() => {
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hasWebGL()) {
      setCap({ ready: true, tier: "off", reduced });
      return;
    }

    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const tinyViewport = window.innerWidth < 380;

    // Being a touchscreen/small-ish viewport used to be enough to force the
    // flat 2D fallback, but that punished every modern phone (iPhones report
    // 6 cores same as a laptop) just for being mobile. Judge actual weakness
    // instead: low core count or low RAM (deviceMemory isn't exposed on iOS
    // Safari, so it simply won't factor in there) or a genuinely tiny screen.
    // Flagship phones now get the real WebGL scene; only budget devices fall
    // back to the 2D graph.
    const weakCPU = cores <= 4;
    const weakMemory = typeof memory === "number" && memory <= 4;
    const low = weakCPU || weakMemory || tinyViewport;

    setCap({ ready: true, tier: low ? "low" : "high", reduced: !!reduced });
  }, []);

  return cap;
}
