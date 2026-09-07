"use client";

import { Canvas } from "@react-three/fiber";
import Architecture from "./Architecture";
import { useInViewport } from "./useInViewport";

export default function ArchitectureScene({ reduced }: { reduced?: boolean }) {
  const { ref, inView } = useInViewport<HTMLDivElement>("300px");

  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        dpr={[1, 1.8]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 1.4, 15.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Architecture reduced={reduced} />
      </Canvas>
    </div>
  );
}
