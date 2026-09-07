"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

import {
  NODES,
  EDGES,
  ACT_COLOR,
  WARM_COLOR,
  FLAGSHIP_WARM,
} from "./graph-data";
import { computeLayout } from "./layout";

/* ---------------- Node (Points) shader ---------------- */
const nodeVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  attribute float aIndex;
  uniform float uTime;
  uniform float uHovered;
  uniform float uSizeScale;
  varying vec3 vColor;
  varying float vHover;
  varying float vFade;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // gentle breathing
    float breathe = 0.85 + 0.15 * sin(uTime * 1.6 + aPhase);
    float hovered = step(0.5, 1.0 - abs(aIndex - uHovered)); // 1 when this == hovered
    vHover = hovered;
    float size = aSize * breathe * (1.0 + hovered * 0.6);
    gl_PointSize = size * uSizeScale / max(-mv.z, 0.001);
    // depth fade for atmosphere
    vFade = smoothstep(26.0, 6.0, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const nodeFragment = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vHover;
  varying float vFade;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    // bright core + soft outer halo (tuned to avoid additive blow-out)
    float core = smoothstep(0.24, 0.0, d);
    float glow = smoothstep(0.5, 0.08, d);
    float a = (core * 1.0 + glow * 0.5) * vFade;
    vec3 col = vColor * (0.7 + core * 1.25 + vHover * 1.0);
    gl_FragColor = vec4(col, a);
  }
`;

/* ---------------- Edge (LineSegments) shader ---------------- */
const edgeVertex = /* glsl */ `
  attribute vec3 aColor;
  attribute float aProg;
  attribute float aSeed;
  attribute float aBridge;
  varying vec3 vColor;
  varying float vProg;
  varying float vSeed;
  varying float vBridge;
  varying float vFade;
  void main() {
    vColor = aColor;
    vProg = aProg;
    vSeed = aSeed;
    vBridge = aBridge;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vFade = smoothstep(28.0, 5.0, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const edgeFragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec3 vColor;
  varying float vProg;
  varying float vSeed;
  varying float vBridge;
  varying float vFade;
  void main() {
    float base = 0.2 + vBridge * 0.1;
    // traveling pulse of "data" along the edge
    float speed = 0.35 + vBridge * 0.25;
    float p = fract(uTime * speed + vSeed);
    float dist = abs(vProg - p);
    dist = min(dist, 1.0 - dist);
    float pulse = smoothstep(0.07, 0.0, dist) * (1.0 + vBridge * 0.9);
    vec3 col = vColor + pulse * vec3(1.0);
    float a = (base + pulse) * vFade;
    gl_FragColor = vec4(col, a);
  }
`;

// Key nodes that always show a label, so the graph reads as a map of real
// skills/projects (not abstract dots) even without hovering.
const PERSISTENT = new Set(["lerka", "guestlist", "go"]);

interface ConstellationProps {
  scrollRef?: React.MutableRefObject<number>;
  reduced?: boolean;
}

export default function Constellation({ scrollRef, reduced }: ConstellationProps) {
  const group = useRef<THREE.Group>(null);
  const nodeMat = useRef<THREE.ShaderMaterial>(null);
  const edgeMat = useRef<THREE.ShaderMaterial>(null);
  const dustMat = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport, camera } = useThree();
  const [hovered, setHovered] = useState<number>(-1);
  const pointer = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => computeLayout(), []);
  const idToIndex = useMemo(() => {
    const m = new Map<string, number>();
    NODES.forEach((n, i) => m.set(n.id, i));
    return m;
  }, []);

  // ---- Node buffers ----
  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = NODES.length;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const sz = new Float32Array(n);
    const ph = new Float32Array(n);
    const idx = new Float32Array(n);
    NODES.forEach((node, i) => {
      const p = positions[node.id];
      pos[i * 3] = p[0];
      pos[i * 3 + 1] = p[1];
      pos[i * 3 + 2] = p[2];
      const base = FLAGSHIP_WARM.has(node.id) ? WARM_COLOR : ACT_COLOR[node.act];
      col[i * 3] = base[0];
      col[i * 3 + 1] = base[1];
      col[i * 3 + 2] = base[2];
      // world-space radius (perspective-scaled to px in the shader)
      sz[i] = 0.15 + node.weight * 0.32 + (node.act === "core" ? 0.24 : 0);
      ph[i] = Math.random() * Math.PI * 2;
      idx[i] = i;
    });
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(ph, 1));
    g.setAttribute("aIndex", new THREE.BufferAttribute(idx, 1));
    return g;
  }, [positions]);

  // ---- Edge buffers ----
  const edgeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const m = EDGES.length;
    const pos = new Float32Array(m * 2 * 3);
    const col = new Float32Array(m * 2 * 3);
    const prog = new Float32Array(m * 2);
    const seed = new Float32Array(m * 2);
    const bridge = new Float32Array(m * 2);
    EDGES.forEach((e, i) => {
      const pa = positions[e.a];
      const pb = positions[e.b];
      const na = NODES[idToIndex.get(e.a)!];
      const nb = NODES[idToIndex.get(e.b)!];
      const ca = FLAGSHIP_WARM.has(e.a) ? WARM_COLOR : ACT_COLOR[na.act];
      const cb = FLAGSHIP_WARM.has(e.b) ? WARM_COLOR : ACT_COLOR[nb.act];
      const s = Math.random();
      const br = e.bridge ? 1 : 0;
      // vertex A
      pos.set(pa, i * 6);
      col.set(e.bridge ? WARM_COLOR : ca, i * 6);
      prog[i * 2] = 0;
      seed[i * 2] = s;
      bridge[i * 2] = br;
      // vertex B
      pos.set(pb, i * 6 + 3);
      col.set(e.bridge ? WARM_COLOR : cb, i * 6 + 3);
      prog[i * 2 + 1] = 1;
      seed[i * 2 + 1] = s;
      bridge[i * 2 + 1] = br;
    });
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aProg", new THREE.BufferAttribute(prog, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aBridge", new THREE.BufferAttribute(bridge, 1));
    return g;
  }, [positions, idToIndex]);

  // ---- Background stardust ----
  const dustGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const N = 650;
    const pos = new Float32Array(N * 3);
    const sz = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const r = 14 + Math.random() * 24;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(p) * Math.cos(t);
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(p);
      sz[i] = 0.015 + Math.random() * 0.03;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    return g;
  }, []);

  // Perspective px-per-world-unit scale: (deviceHeight/2) / tan(fov/2).
  // Multiplying a world radius by this and dividing by view-depth gives px size.
  const uSizeScale = useMemo(() => {
    const fov = (camera as THREE.PerspectiveCamera).fov ?? 52;
    return (size.height * viewport.dpr) / (2 * Math.tan((fov * Math.PI) / 360));
  }, [size.height, viewport.dpr, camera]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (nodeMat.current) nodeMat.current.uniforms.uTime.value = t;
    if (edgeMat.current) edgeMat.current.uniforms.uTime.value = t;
    if (dustMat.current) dustMat.current.uniforms.uSizeScale.value = uSizeScale;

    // pointer parallax (screen-space normalized already by r3f state.pointer)
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;

    if (group.current) {
      const scroll = scrollRef?.current ?? 0;
      // Gentle sway (keeps labels readable, unlike a full spin) + pointer
      // parallax. Reduced motion stills the sway; breathing + data-pulses stay.
      const sway = reduced ? 0 : Math.sin(t * 0.12) * 0.16;
      const targetY = sway + pointer.current.x * 0.28;
      const targetX = -pointer.current.y * 0.16 + scroll * 0.12;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.045;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.045;
      // Positional parallax + gentle rise on scroll. Base offset nudges the
      // dense core right-of-centre so it clears the headline copy on the left.
      const baseX = 0;
      group.current.position.x += (baseX + pointer.current.x * 0.5 - group.current.position.x) * 0.04;
      group.current.position.y += (-scroll * 1.4 - group.current.position.y) * 0.04;
    }
  });

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (e.index != null) setHovered(e.index);
  };
  const onOut = () => setHovered(-1);

  const hoveredNode = hovered >= 0 ? NODES[hovered] : null;
  const hoveredPos = hoveredNode ? positions[hoveredNode.id] : null;

  return (
    <group ref={group}>
      {/* Background stardust */}
      <points geometry={dustGeo}>
        <shaderMaterial
          ref={dustMat}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{ uSizeScale: { value: 1 } }}
          vertexShader={/* glsl */ `
            attribute float aSize;
            uniform float uSizeScale;
            varying float vFade;
            void main() {
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = aSize * uSizeScale / max(-mv.z, 0.001);
              vFade = smoothstep(44.0, 8.0, -mv.z) * 0.6;
              gl_Position = projectionMatrix * mv;
            }
          `}
          fragmentShader={/* glsl */ `
            precision mediump float;
            varying float vFade;
            void main() {
              float d = length(gl_PointCoord - 0.5);
              if (d > 0.5) discard;
              float a = smoothstep(0.5, 0.0, d) * vFade;
              gl_FragColor = vec4(vec3(0.82, 0.82, 0.8), a);
            }
          `}
        />
      </points>

      {/* Edges */}
      <lineSegments geometry={edgeGeo}>
        <shaderMaterial
          ref={edgeMat}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={edgeVertex}
          fragmentShader={edgeFragment}
        />
      </lineSegments>

      {/* Nodes */}
      <points geometry={nodeGeo} onPointerMove={onMove} onPointerOut={onOut}>
        <shaderMaterial
          ref={nodeMat}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uHovered: { value: -1 },
            uSizeScale: { value: uSizeScale },
          }}
          vertexShader={nodeVertex}
          fragmentShader={nodeFragment}
        />
      </points>

      {/* Sync hover + size uniform imperatively (avoids re-creating material) */}
      <HoverSync matRef={nodeMat} hovered={hovered} uSizeScale={uSizeScale} />

      {/* Persistent key labels — makes the graph self-explanatory */}
      {NODES.filter((n) => PERSISTENT.has(n.id)).map((n) => (
        <Html
          key={n.id}
          position={positions[n.id]}
          center
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="c-node-label" data-act={n.act}>
            {n.label}
          </div>
        </Html>
      ))}

      {/* Identity anchored at the core */}
      <Html
        position={positions["core"]}
        center
        zIndexRange={[30, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div className="c-core-chip">
          <span className="c-core-name">Jeremia Axelano</span>
          <span className="c-core-role">CTO · Full-Stack · AI Systems</span>
        </div>
      </Html>

      {/* Hover label */}
      {hoveredNode && hoveredPos && (
        <Html
          position={hoveredPos}
          center
          distanceFactor={10}
          style={{ pointerEvents: "none" }}
        >
          <div className="constellation-tip">
            <span className="tip-label">{hoveredNode.label}</span>
            {hoveredNode.sub && <span className="tip-sub">{hoveredNode.sub}</span>}
          </div>
        </Html>
      )}
    </group>
  );
}

/* Small helper so uniforms update without recreating the ShaderMaterial. */
function HoverSync({
  matRef,
  hovered,
  uSizeScale,
}: {
  matRef: React.MutableRefObject<THREE.ShaderMaterial | null>;
  hovered: number;
  uSizeScale: number;
}) {
  useFrame(() => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uHovered.value = hovered;
    m.uniforms.uSizeScale.value = uSizeScale;
  });
  return null;
}
