"use client";

import { ARCH_NODES, LAYER_COLOR, type Layer } from "./architecture-data";

/** Clean 2D layered diagram — mobile / low-power / no-WebGL fallback. */
const ROWS: { layer: Layer | "bottom"; label: string; filter: (l: Layer) => boolean }[] = [
  { layer: "client", label: "Clients", filter: (l) => l === "client" },
  { layer: "gateway", label: "Gateway", filter: (l) => l === "gateway" },
  { layer: "service", label: "Microservices · Go", filter: (l) => l === "service" },
  { layer: "bottom", label: "Data & Integrations", filter: (l) => l === "data" || l === "external" },
];

export default function Architecture2D() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-4 p-4">
      {ROWS.map((row, ri) => {
        const nodes = ARCH_NODES.filter((n) => row.filter(n.layer));
        return (
          <div key={row.label} className="flex flex-col items-center gap-2">
            <span className="font-tech text-[9px] uppercase tracking-[0.2em] text-white/35">
              {row.label}
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {nodes.map((n) => {
                const c = LAYER_COLOR[n.layer];
                return (
                  <span
                    key={n.id}
                    className="rounded-lg border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm"
                    style={{
                      color: c,
                      borderColor: `${c}44`,
                      background: `${c}12`,
                    }}
                  >
                    {n.label}
                  </span>
                );
              })}
            </div>
            {ri < ROWS.length - 1 && (
              <span className="h-4 w-px bg-gradient-to-b from-white/25 to-white/5" />
            )}
          </div>
        );
      })}
    </div>
  );
}
