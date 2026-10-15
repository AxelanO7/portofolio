"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { EV, emit } from "@/lib/events";

type Item = { label: string; go?: string; act?: "reel" | "intro" | "whoami" | "copy"; tag: "go" | "action" };

const ITEMS: Item[] = [
  { label: "Hero", go: "top", tag: "go" },
  { label: "Watch the trailer", go: "trailer", tag: "go" },
  { label: "Platform surfaces", go: "platform", tag: "go" },
  { label: "System map", go: "system", tag: "go" },
  { label: "Live tiles", go: "live", tag: "go" },
  { label: "Case studies", go: "cases", tag: "go" },
  { label: "Cities and globe", go: "atlas", tag: "go" },
  { label: "AI agents", go: "agents", tag: "go" },
  { label: "Wall of screens", go: "wall", tag: "go" },
  { label: "Search builds", go: "work", tag: "go" },
  { label: "Terminal and diffs", go: "terminal", tag: "go" },
  { label: "About and timeline", go: "about", tag: "go" },
  { label: "Tech arsenal", go: "arsenal", tag: "go" },
  { label: "Contact", go: "contact", tag: "go" },
  { label: "Replay the trailer", act: "reel", tag: "action" },
  { label: "Replay the intro", act: "intro", tag: "action" },
  { label: "Run whoami", act: "whoami", tag: "action" },
  { label: "Copy email", act: "copy", tag: "action" },
];

/** Cmd or Ctrl K. Type to filter, arrows and Enter to run. */
export default function Palette() {
  const home = usePathname() === "/";
  const [on, setOn] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useMemo(() => ITEMS.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())), [q]);

  useEffect(() => {
    const open = () => {
      setQ("");
      setSel(0);
      setOn(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOn((v) => {
          if (!v) {
            setQ("");
            setSel(0);
          }
          return !v;
        });
      } else if (e.key === "Escape") setOn(false);
    };
    window.addEventListener(EV.palette, open);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EV.palette, open);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (on) window.setTimeout(() => input.current?.focus(), 30);
  }, [on]);

  const scroll = (id: string) => {
    if (!home) {
      window.location.assign(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const run = (i: Item) => {
    setOn(false);
    if (i.go) return scroll(i.go);
    if (i.act === "reel") {
      scroll("trailer");
      window.setTimeout(() => emit(EV.reel), 500);
    } else if (i.act === "intro") {
      try {
        sessionStorage.removeItem("ax-seen");
      } catch {
        /* storage blocked */
      }
      window.location.assign("/");
    } else if (i.act === "whoami") {
      scroll("terminal");
      window.setTimeout(() => emit(EV.term, "whoami"), 500);
    } else if (i.act === "copy") {
      scroll("contact");
      window.setTimeout(() => emit(EV.copy), 600);
    }
  };

  return (
    <div className={`pal${on ? " on" : ""}`} onClick={(e) => e.target === e.currentTarget && setOn(false)}>
      <div className="pbox" role="dialog" aria-label="Command palette">
        <input
          ref={input}
          value={q}
          placeholder="Go to a section or run a command…"
          autoComplete="off"
          aria-label="Command palette"
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          onKeyDown={(e) => {
            if (!list.length) return;
            if (e.key === "ArrowDown") {
              setSel((s) => (s + 1) % list.length);
              e.preventDefault();
            } else if (e.key === "ArrowUp") {
              setSel((s) => (s - 1 + list.length) % list.length);
              e.preventDefault();
            } else if (e.key === "Enter") run(list[Math.min(sel, list.length - 1)]);
          }}
        />
        <ul>
          {list.map((i, k) => (
            <li key={i.label} className={k === sel ? "on" : undefined} onClick={() => run(i)}>
              {i.label}
              <small>{i.tag}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
