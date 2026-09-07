/**
 * Deterministic 3D layout for the Build Graph.
 * Two lobes (Foundation left, AI right) around a central core, so the
 * constellation always reads as "one person, two eras" and never re-shuffles.
 */
import { NODES, type GraphNode } from "./graph-data";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Positions = Record<string, [number, number, number]>;

export function computeLayout(): Positions {
  const rand = mulberry32(20260906);
  const pos: Positions = {};

  const LOBE_X = 2.8; // distance of each cluster center from origin
  const foundation = NODES.filter((n) => n.act === "foundation");
  const ai = NODES.filter((n) => n.act === "ai");

  pos["core"] = [0, 0, 0];

  const placeLobe = (nodes: GraphNode[], cx: number) => {
    const n = nodes.length;
    // Fibonacci-sphere directions for even angular spread, then jitter.
    const golden = Math.PI * (3 - Math.sqrt(5));
    nodes.forEach((node, i) => {
      const y = 1 - (i / (n - 1)) * 2; // 1 → -1
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      let dx = Math.cos(theta) * r;
      let dz = Math.sin(theta) * r;
      let dy = y;

      // Important nodes sit closer in; light nodes drift out.
      const shell = 1.35 + (1 - node.weight) * 1.5 + (rand() - 0.5) * 0.5;
      // Jitter for an organic, non-mechanical feel.
      dx += (rand() - 0.5) * 0.35;
      dy += (rand() - 0.5) * 0.5;
      dz += (rand() - 0.5) * 0.35;

      pos[node.id] = [
        cx + dx * shell,
        dy * (1.7 + rand() * 0.6),
        dz * shell * 0.9,
      ];
    });
  };

  placeLobe(foundation, -LOBE_X);
  placeLobe(ai, LOBE_X);

  return pos;
}
