"use client";

import dynamic from "next/dynamic";
import { useCapability } from "./useCapability";
import Architecture2D from "./Architecture2D";

const ArchitectureScene = dynamic(() => import("./ArchitectureScene"), {
  ssr: false,
  loading: () => null,
});

export default function ArchitectureClient() {
  const cap = useCapability();

  if (!cap.ready) return <Architecture2D />;
  if (cap.tier === "high") return <ArchitectureScene reduced={cap.reduced} />;
  return <Architecture2D />;
}
