"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ARSENAL, CROSS_LINKS } from "@/config/arsenal";

/**
 * "Build graph": one node per tool in the arsenal, arranged as a spiral galaxy
 * with one arm per stack. Motion is time-based (slow spin) plus mouse parallax.
 * Nothing here reads scroll position. Picking a stack dims every other arm.
 */

interface N {
  name: string;
  cat: number; // -1 = core
  p: [number, number, number];
}

function buildLayout() {
  const nodes: N[] = [];
  const edges: [number, number, number][] = [];
  const idx: Record<string, number> = {};
  ARSENAL.forEach((a, k) => {
    a.tools.forEach((t, j) => {
      const rr = 1.3 + j * 0.3;
      const ang = k * ((2 * Math.PI) / ARSENAL.length) + rr * 0.5;
      idx[t] = nodes.length;
      nodes.push({ name: t, cat: k, p: [rr * Math.cos(ang), Math.sin(j * 1.7 + k) * 0.32, rr * Math.sin(ang)] });
      if (j > 0) edges.push([idx[t] - 1, idx[t], k]);
    });
  });
  const core = nodes.length;
  nodes.push({ name: "Axelano", cat: -1, p: [0, 0, 0] });
  ARSENAL.forEach((a, k) => edges.push([core, idx[a.tools[0]], k]));
  const cross: [number, number][] = [];
  CROSS_LINKS.forEach(([a, b]) => {
    if (idx[a] != null && idx[b] != null) cross.push([idx[a], idx[b]]);
  });
  return { nodes, edges, cross };
}

function makeLabel(text: string, color: string, big: boolean) {
  const c = document.createElement("canvas");
  c.width = 420;
  c.height = 84;
  const x = c.getContext("2d")!;
  x.font = `${big ? "700 36px" : "500 28px"} Outfit, Inter, sans-serif`;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = color;
  x.fillText(text, 210, 44);
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  sp.scale.set(big ? 3.3 : 2.55, big ? 0.66 : 0.51, 1);
  return sp;
}

export default function BuildGraph({ focus }: { focus: number | null }) {
  const host = useRef<HTMLDivElement>(null);
  const focusRef = useRef<number | null>(focus);
  const [failed, setFailed] = useState(false);
  focusRef.current = focus;

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    el.appendChild(renderer.domElement);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const R = 4.2;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    cam.position.set(0, 0, 10.6);
    const group = new THREE.Group();
    scene.add(group);

    const L = buildLayout();
    const meshes: THREE.Mesh[] = [];
    const halos: THREE.Mesh[] = [];
    const sprites: THREE.Sprite[] = [];
    const lines: THREE.LineSegments[] = [];
    const disposables: { dispose(): void }[] = [];
    let alive = true;
    let built = false;
    let visible = true;
    let raf = 0;
    let px = 0;
    let py = 0;
    const cur = ARSENAL.map(() => 1);

    const build = () => {
      if (!alive) return;
      L.nodes.forEach((n) => {
        const core = n.cat < 0;
        const col = core ? "#f4c97a" : ARSENAL[n.cat].color;
        const g1 = new THREE.SphereGeometry(core ? 0.36 : 0.13, 10, 8);
        const m1 = new THREE.MeshBasicMaterial({ color: col, transparent: true });
        const mesh = new THREE.Mesh(g1, m1);
        mesh.position.set(...n.p);
        group.add(mesh);
        meshes.push(mesh);
        const g2 = new THREE.SphereGeometry(core ? 0.7 : 0.27, 10, 8);
        const m2 = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.13 });
        const halo = new THREE.Mesh(g2, m2);
        halo.position.copy(mesh.position);
        group.add(halo);
        halos.push(halo);
        const sp = makeLabel(n.name, core ? "#f7e3b5" : "#dbeaf0", core);
        sp.position.set(n.p[0], n.p[1] + (core ? 0.85 : 0.38), n.p[2]);
        group.add(sp);
        sprites.push(sp);
        disposables.push(g1, m1, g2, m2, sp.material, (sp.material as THREE.SpriteMaterial).map as THREE.Texture);
      });
      ARSENAL.forEach((a, k) => {
        const arr: number[] = [];
        L.edges.forEach((e) => {
          if (e[2] === k) arr.push(...L.nodes[e[0]].p, ...L.nodes[e[1]].p);
        });
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
        const m = new THREE.LineBasicMaterial({ color: a.color, transparent: true, opacity: 0.34 });
        const ls = new THREE.LineSegments(g, m);
        group.add(ls);
        lines.push(ls);
        disposables.push(g, m);
      });
      const ca: number[] = [];
      L.cross.forEach((e) => ca.push(...L.nodes[e[0]].p, ...L.nodes[e[1]].p));
      const cg = new THREE.BufferGeometry();
      cg.setAttribute("position", new THREE.Float32BufferAttribute(ca, 3));
      const cm = new THREE.LineBasicMaterial({ color: 0xcfe9f0, transparent: true, opacity: 0.16 });
      group.add(new THREE.LineSegments(cg, cm));
      const dust: number[] = [];
      for (let i = 0; i < 160; i++) dust.push((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12);
      const dg = new THREE.BufferGeometry();
      dg.setAttribute("position", new THREE.Float32BufferAttribute(dust, 3));
      const dm = new THREE.PointsMaterial({ color: 0x8fadc2, size: 0.04, transparent: true, opacity: 0.55 });
      group.add(new THREE.Points(dg, dm));
      disposables.push(cg, cm, dg, dm);
      built = true;
      frame(performance.now());
    };

    const v = new THREE.Vector3();
    const t0 = performance.now();
    const size = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return false;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      return true;
    };
    const draw = (t: number) => {
      if (!built || !size()) return;
      const s = (t - t0) / 1000;
      group.rotation.y = reduce ? 0.5 : s * 0.14 + px;
      group.rotation.x = 0.95 + (reduce ? 0 : Math.sin(s * 0.16) * 0.06) + py;
      group.updateMatrixWorld(true);
      const f = focusRef.current;
      for (let k = 0; k < cur.length; k++) {
        const tgt = f == null || f === k ? 1 : 0;
        cur[k] += (tgt - cur[k]) * 0.14;
        (lines[k].material as THREE.LineBasicMaterial).opacity = 0.34 * (0.15 + 0.85 * cur[k]);
      }
      L.nodes.forEach((n, i) => {
        const a = n.cat < 0 ? 1 : 0.1 + 0.9 * cur[n.cat];
        (meshes[i].material as THREE.MeshBasicMaterial).opacity = a;
        (halos[i].material as THREE.MeshBasicMaterial).opacity = 0.13 * a;
        sprites[i].getWorldPosition(v);
        const dp = Math.max(0, Math.min(1, (v.z + R) / (2 * R)));
        const base = n.cat < 0 ? 0.65 + 0.35 * dp : 0.04 + 0.9 * Math.pow(dp, 1.9);
        (sprites[i].material as THREE.SpriteMaterial).opacity = base * a;
      });
      renderer.render(scene, cam);
    };
    const frame = (t: number) => {
      if (!alive) return;
      draw(t);
      if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
      else raf = 0;
    };
    const wake = () => {
      if (built && !raf && alive && visible && !document.hidden && !reduce) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      wake();
    });
    io.observe(el);
    const ro = new ResizeObserver(() => {
      if (reduce) draw(performance.now());
    });
    ro.observe(el);
    document.addEventListener("visibilitychange", wake);
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const b = el.getBoundingClientRect();
      px = ((e.clientX - b.left) / b.width - 0.5) * 0.7;
      py = ((e.clientY - b.top) / b.height - 0.5) * 0.4;
    };
    el.addEventListener("pointermove", onMove);

    // labels use Outfit; wait for the font so the sprites are not drawn in a fallback face
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.load) {
      Promise.all([fonts.load("500 28px Outfit"), fonts.load("700 36px Outfit")]).catch(() => undefined).then(build);
    } else {
      build();
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", wake);
      el.removeEventListener("pointermove", onMove);
      disposables.forEach((d) => {
        try {
          d.dispose();
        } catch {
          /* already disposed */
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={host} className="absolute inset-0" style={{ touchAction: "pan-y" }}>
      {failed && (
        <div className="grid h-full place-items-center px-6 text-center text-sm text-mist">
          The 3D graph needs WebGL. The full tool list is below.
        </div>
      )}
    </div>
  );
}
