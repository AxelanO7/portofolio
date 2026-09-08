"use client";

import { useMemo, useRef } from "react";
import { NODES, EDGES, FLAGSHIP_WARM, type Act } from "./graph-data";

/**
 * Lightweight 2D constellation — used on mobile / low-power / reduced-motion /
 * no-WebGL. Same two-lobe story (Foundation left, AI right), rendered as an
 * animated, drag-responsive SVG so it still looks intentional and premium,
 * not a flat poster.
 *
 * Drag is hand-rolled with plain Pointer Events rather than framer-motion's
 * `drag` prop: the app-wide `LazyMotion features={domAnimation}` bundle
 * (see app/providers.tsx) deliberately excludes pan/drag gestures — only
 * `domMax` has those — so `motion.div drag` silently no-ops here. Native
 * pointer events avoid that pitfall and keep the bundle light.
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

const DRAG_CLAMP = 70; // px, elastic-ish cap on how far a swipe can pan the graph

export default function ConstellationFallback({ reduced }: { reduced?: boolean }) {
  const dragRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, offsetX: 0, pointerId: -1 });

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

  const applyTransform = (offsetX: number, animated: boolean) => {
    const el = dragRef.current;
    if (!el) return;
    el.style.transition = animated ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" : "none";
    el.style.transform = `translateX(${offsetX}px) rotate(${offsetX * 0.03}deg)`;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current.active = true;
    drag.current.startX = e.clientX - drag.current.offsetX;
    drag.current.pointerId = e.pointerId;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const raw = e.clientX - drag.current.startX;
    // Soft clamp: linear near 0, compresses hard past DRAG_CLAMP.
    const clamped = Math.abs(raw) <= DRAG_CLAMP
      ? raw
      : Math.sign(raw) * (DRAG_CLAMP + (Math.abs(raw) - DRAG_CLAMP) * 0.15);
    drag.current.offsetX = clamped;
    applyTransform(clamped, false);
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    drag.current.offsetX = 0;
    applyTransform(0, true);
  };

  return (
    <div
      ref={dragRef}
      className="h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full"
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
          {!reduced && (
            <style>{`
              @keyframes cfallback-drift {
                0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
                50% { transform: translate(-10px, 7px) rotate(0.7deg); }
              }
              .cfallback-drift {
                transform-origin: ${W / 2}px ${H / 2}px;
                animation: cfallback-drift 16s ease-in-out infinite;
              }
            `}</style>
          )}
        </defs>

        {/* Whole graph gets a slow drift so it visibly reads as "alive" even
            when the per-node opacity pulse alone is too subtle to notice.
            Drag (via the wrapping div's transform above) layers on top. */}
        <g className={!reduced ? "cfallback-drift" : undefined}>
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
                          ? "0.4;0.95;0.4"
                          : "0.12;0.5;0.12"
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
                      values="0.5;1;0.5"
                      dur={`${2.4 + (node.weight * 2)}s`}
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
