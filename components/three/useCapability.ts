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
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    const small = window.innerWidth < 820;

    // Mobile / touch / tiny viewport / genuinely weak CPU → lighter 2D
    // fallback (battery + thermal + fill-rate). NOTE: deviceMemory used to
    // factor in here too, but Chrome buckets/caps that value low on plenty
    // of normal 8GB+ laptops, which was silently routing capable desktops
    // into the flat SVG fallback (no labels, no motion) instead of the real
    // WebGL scene. Coarse pointer + small viewport already catch mobile.
    const low = coarse || small || cores <= 2;

    setCap({ ready: true, tier: low ? "low" : "high", reduced: !!reduced });
  }, []);

  return cap;
}
