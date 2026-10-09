"use client";

import { useEffect, useRef, useState } from "react";
import BuildGraph from "@/components/three/BuildGraphClient";
import GalaxyPlaceholder from "@/components/three/GalaxyPlaceholder";
import { ARSENAL, TOOL_COUNT } from "@/config/arsenal";
import { useI18n } from "@/lib/i18n";

/** One node per tool. three.js only loads once the section is close to the viewport. */
export default function ToolGalaxy() {
  const { t } = useI18n();
  const [focus, setFocus] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [near, setNear] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <div ref={box} className="stage">
        <div className="hud">
          <i />
          build-graph · {TOOL_COUNT} tools · {ARSENAL.length} stacks
        </div>
        <GalaxyPlaceholder ready={ready} />
        {near && <BuildGraph focus={focus} onReady={() => setReady(true)} />}
      </div>

      <div className="legend mt-5" role="group" aria-label="Isolate a stack">
        <button type="button" className="chip" aria-pressed={focus === null} onClick={() => setFocus(null)}>
          {t("stack_all")} · {TOOL_COUNT}
        </button>
        {ARSENAL.map((s, k) => (
          <button key={s.name} type="button" className="chip" aria-pressed={focus === k} onClick={() => setFocus(focus === k ? null : k)}>
            <i style={{ background: s.color }} />
            {s.name} · {s.tools.length}
          </button>
        ))}
      </div>
    </div>
  );
}
