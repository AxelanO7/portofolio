"use client";

import { Canvas } from "@react-three/fiber";
import Constellation from "./Constellation";
import { useInViewport } from "./useInViewport";

interface Props {
  scrollRef?: React.MutableRefObject<number>;
  reduced?: boolean;
}

/**
 * WebGL <Canvas> wrapper for the Build Graph. Kept separate so it can be
 * dynamically imported (ssr:false) and code-split out of the initial bundle.
 * Render loop pauses once scrolled well past the hero — otherwise this scene
 * (plus the Guestlist architecture scene) keeps animating at 60fps forever,
 * competing with Lenis's smooth-scroll RAF loop and causing scroll jank.
 */
export default function ConstellationScene({ scrollRef, reduced }: Props) {
  const { ref, inView } = useInViewport<HTMLDivElement>("400px");

  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        dpr={[1, 1.8]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0.2, 14], fov: 52 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        raycaster={{ params: { Points: { threshold: 0.55 } } as any }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ pointerEvents: "auto" }}
      >
        <Constellation scrollRef={scrollRef} reduced={reduced} />
      </Canvas>
    </div>
  );
}
