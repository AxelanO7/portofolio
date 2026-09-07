"use client";

import { useMemo } from "react";
import { NODES, EDGES, FLAGSHIP_WARM, type Act } from "./graph-data";

/**
 * Lightweight 2D constellation — used on mobile / low-power / reduced-motion /
 * no-WebGL. Same two-lobe story (Foundation left, AI right), rendered as an
 * animated SVG so it still looks intentional and premium, not a flat poster.
 */

const W = 1000;
const H = 620;

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLOR: Record<Act, string> = {
  core: "#ffffff",
  foundation: "#b8b8b3",
  ai: "#c9a875",
};
const WARM = "#e8caa0";

export default function ConstellationFallback({ reduced }: { reduced?: boolean }) {
  const { pos } = useMemo(() => {
    const rand = mulberry32(20260906);
    const pos: Record<string, { x: number; y: number; r: number; c: string }> = {};
    const cx = W / 2;
    const cy = H / 2;

    pos["core"] = { x: cx, y: cy, r: 13, c: "#ffffff" };

    const lobe = (act: Act, centerX: number) => {
      const nodes = NODES.filter((n) => n.act === act);
      const n = nodes.length;
      nodes.forEach((node, i) => {
        const ang = (i / n) * Math.PI * 2 + rand() * 0.6;
        const rad = 90 + (1 - node.weight) * 150 + rand() * 40;
        const x = centerX + Math.cos(ang) * rad;
        const y = cy + Math.sin(ang) * rad * 0.62 + (rand() - 0.5) * 40;
        pos[node.id] = {
          x,
          y,
          r: 4 + node.weight * 9,
          c: FLAGSHIP_WARM.has(node.id) ? WARM : COLOR[act],
        };
      });
    };
    lobe("foundation", W * 0.27);
    lobe("ai", W * 0.73);
    return { pos };
  }, []);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <filter id="cglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      <g stroke="currentColor" strokeWidth="1">
        {EDGES.map((e, i) => {
          const a = pos[e.a];
          const b = pos[e.b];
          if (!a || !b) return null;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={e.bridge ? WARM : "#6b6b66"}
              strokeOpacity={e.bridge ? 0.5 : 0.28}
              strokeWidth={e.bridge ? 1.4 : 1}
            >
              {!reduced && (
                <animate
                  attributeName="stroke-opacity"
                  values={
                    e.bridge
                      ? "0.5;0.85;0.5"
                      : "0.18;0.42;0.18"
                  }
                  dur={`${3 + (i % 5) * 0.6}s`}
                  repeatCount="indefinite"
                />
              )}
            </line>
          );
        })}
      </g>

      {/* Nodes */}
      <g filter="url(#cglow)">
        {NODES.map((node) => {
          const p = pos[node.id];
          if (!p) return null;
          return (
            <circle key={node.id} cx={p.x} cy={p.y} r={p.r} fill={p.c}>
              {!reduced && (
                <animate
                  attributeName="opacity"
                  values="0.75;1;0.75"
                  dur={`${2.4 + (node.weight * 2)}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
