"use client";

import { useMemo, useState } from "react";
import { OrbitControls, RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

import {
  ARCH_NODES,
  ARCH_EDGES,
  LAYER_COLOR,
  LAYER_Y,
  type ArchNode,
} from "./architecture-data";

type Vec3 = [number, number, number];

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function spread(count: number, width: number, i: number): number {
  if (count === 1) return 0;
  return -width / 2 + (width * i) / (count - 1);
}

function useLayout(): Record<string, Vec3> {
  return useMemo(() => {
    const pos: Record<string, Vec3> = {};
    const clients = ARCH_NODES.filter((n) => n.layer === "client");
    const services = ARCH_NODES.filter((n) => n.layer === "service");
    const bottom = ARCH_NODES.filter(
      (n) => n.layer === "data" || n.layer === "external"
    );

    clients.forEach((n, i) => {
      pos[n.id] = [spread(clients.length, 7.6, i), LAYER_Y.client, i % 2 ? -0.35 : 0.35];
    });
    pos["gw"] = [0, LAYER_Y.gateway, 0];
    services.forEach((n, i) => {
      pos[n.id] = [spread(services.length, 8.8, i), LAYER_Y.service, i % 2 ? 0.4 : -0.4];
    });
    bottom.forEach((n, i) => {
      pos[n.id] = [spread(bottom.length, 9.4, i), LAYER_Y.data, i % 2 ? -0.35 : 0.35];
    });
    return pos;
  }, []);
}

function ArchNodeMesh({
  node,
  position,
  hovered,
  onHover,
}: {
  node: ArchNode;
  position: Vec3;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const color = LAYER_COLOR[node.layer];
  const isHover = hovered === node.id;
  const dim = hovered !== null && !isHover;
  const size: Vec3 =
    node.layer === "gateway" ? [1.95, 0.92, 0.92] : [1.6, 0.74, 0.74];

  return (
    <group position={position}>
      <RoundedBox
        args={size}
        radius={0.12}
        smoothness={4}
        scale={isHover ? 1.08 : 1}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHover ? 0.95 : 0.32}
          metalness={0.45}
          roughness={0.35}
          transparent
          opacity={dim ? 0.5 : 0.97}
        />
      </RoundedBox>
      <Html
        center
        position={[0, -(size[1] / 2) - 0.42, 0]}
        style={{ pointerEvents: "none" }}
        zIndexRange={[20, 0]}
      >
        <div className="arch-label" data-hover={isHover} data-dim={dim}>
          <span className="arch-name">{node.label}</span>
          <span className="arch-tech">{node.tech}</span>
        </div>
      </Html>
    </group>
  );
}

export default function Architecture({ reduced }: { reduced?: boolean }) {
  const pos = useLayout();
  const [hovered, setHovered] = useState<string | null>(null);

  const edgeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const m = ARCH_EDGES.length;
    const p = new Float32Array(m * 6);
    const c = new Float32Array(m * 6);
    ARCH_EDGES.forEach((e, i) => {
      const pa = pos[e.a];
      const pb = pos[e.b];
      const na = ARCH_NODES.find((n) => n.id === e.a)!;
      const nb = ARCH_NODES.find((n) => n.id === e.b)!;
      const ca = hexToRgb(LAYER_COLOR[na.layer]);
      const cb = hexToRgb(LAYER_COLOR[nb.layer]);
      p.set(pa, i * 6);
      p.set(pb, i * 6 + 3);
      c.set(ca, i * 6);
      c.set(cb, i * 6 + 3);
    });
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    g.setAttribute("color", new THREE.BufferAttribute(c, 3));
    return g;
  }, [pos]);

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 9, 6]} intensity={0.85} />
      <pointLight position={[0, 0, 7]} intensity={0.6} color="#e8caa0" />

      {/* connections */}
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* nodes */}
      {ARCH_NODES.map((n) => (
        <ArchNodeMesh
          key={n.id}
          node={n}
          position={pos[n.id]}
          hovered={hovered}
          onHover={setHovered}
        />
      ))}

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.8}
        rotateSpeed={0.6}
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.7}
      />
    </>
  );
}
