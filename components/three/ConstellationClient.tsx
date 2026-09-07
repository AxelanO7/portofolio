"use client";

import dynamic from "next/dynamic";
import { useCapability } from "./useCapability";
import ConstellationFallback from "./ConstellationFallback";

// WebGL scene is code-split out of the initial bundle and never SSR'd.
const ConstellationScene = dynamic(() => import("./ConstellationScene"), {
  ssr: false,
  loading: () => null,
});

export default function ConstellationClient({
  scrollRef,
}: {
  scrollRef?: React.MutableRefObject<number>;
}) {
  const cap = useCapability();

  // Before capability resolves (and on SSR), show the lightweight 2D graph so
  // there's never an empty hero flash.
  if (!cap.ready) {
    return (
      <div className="absolute inset-0 opacity-70">
        <ConstellationFallback reduced />
      </div>
    );
  }

  // Capable devices always get the live WebGL scene. Reduced-motion only
  // *calms* it (no auto-sway) inside the scene — it never goes fully static.
  if (cap.tier === "high") {
    return <ConstellationScene scrollRef={scrollRef} reduced={cap.reduced} />;
  }

  // Mobile / low-power / no-WebGL → 2D graph. Keep a gentle pulse alive so it
  // never looks dead (kept subtle, low vestibular risk).
  return (
    <div className="absolute inset-0 text-white/40">
      <ConstellationFallback reduced={false} />
    </div>
  );
}
