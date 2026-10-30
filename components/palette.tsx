"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { EV, emit } from "@/lib/events";
import { inertExcept, lockScroll, trapTab } from "@/lib/modal";
import { isStill, setStill, switchedOff } from "@/lib/motion";

type Item = { label: string; go?: string; act?: "reel" | "intro" | "whoami" | "copy" | "still"; tag: "go" | "action" };

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
  { label: "Pause or resume motion", act: "still", tag: "action" },
];

/**
 * Cmd or Ctrl K. A modal dialog: focus moves to the search field, the page behind is inert and does not scroll,
 * Tab stays inside, Escape or a click on the backdrop closes it and focus goes back to what opened it.
 * The field is a combobox over the list (arrows move the highlight, Enter runs it).
 */
export default function Palette() {
  const home = usePathname() === "/";
  const [on, setOn] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const isOn = useRef(false);
  const list = useMemo(() => ITEMS.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())), [q]);
  const cur = Math.min(sel, Math.max(0, list.length - 1));
  isOn.current = on;

  useEffect(() => {
    const open = () => {
      trigger.current = document.activeElement as HTMLElement | null;
      setQ("");
      setSel(0);
      setOn(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOn.current) setOn(false);
        else open();
      } else if (e.key === "Escape") setOn(false);
    };
    window.addEventListener(EV.palette, open);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EV.palette, open);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  /* while open: lock scroll, make the page behind inert, focus the field; on close give focus back */
  useEffect(() => {
    if (!on) return;
    const unlock = lockScroll();
    const unInert = inertExcept([root.current]);
    const t = window.setTimeout(() => input.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      unInert();
      unlock();
      const from = trigger.current;
      const back = from && from.isConnected && !from.closest("#ov") ? from : document.querySelector<HTMLElement>(".hb") ?? document.getElementById("main");
      if (back && back.offsetParent !== null) back.focus({ preventScroll: true });
      else document.getElementById("main")?.focus({ preventScroll: true });
    };
  }, [on]);

  /* keep the highlighted row in view inside the list (not the page) */
  useEffect(() => {
    if (!on) return;
    const el = document.getElementById(`pal-o-${cur}`);
    const ul = el?.parentElement;
    if (!el || !ul) return;
    if (el.offsetTop < ul.scrollTop) ul.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > ul.scrollTop + ul.clientHeight) ul.scrollTop = el.offsetTop + el.offsetHeight - ul.clientHeight;
  }, [cur, on]);

  const scroll = (id: string) => {
    if (!home) {
      window.location.assign(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: isStill() ? "auto" : "smooth" });
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
    } else if (i.act === "still") {
      setStill(!switchedOff());
    }
  };

  return (
    <div className={`pal${on ? " on" : ""}`} ref={root} onClick={(e) => e.target === e.currentTarget && setOn(false)}>
      <div className="pbox" ref={box} role="dialog" aria-modal="true" aria-label="Command palette" lang="en" onKeyDown={(e) => trapTab(e.nativeEvent, box.current)}>
        <input
          ref={input}
          value={q}
          placeholder="Go to a section or run a command…"
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-expanded="true"
          aria-controls="pal-list"
          aria-autocomplete="list"
          aria-activedescendant={list.length ? `pal-o-${cur}` : undefined}
          aria-label="Search commands"
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          onKeyDown={(e) => {
            if (!list.length) return;
            if (e.key === "ArrowDown") {
              setSel((s) => (Math.min(s, list.length - 1) + 1) % list.length);
              e.preventDefault();
            } else if (e.key === "ArrowUp") {
              setSel((s) => (Math.min(s, list.length - 1) - 1 + list.length) % list.length);
              e.preventDefault();
            } else if (e.key === "Home") {
              setSel(0);
              e.preventDefault();
            } else if (e.key === "End") {
              setSel(list.length - 1);
              e.preventDefault();
            } else if (e.key === "Enter") run(list[cur]);
          }}
        />
        <ul id="pal-list" role="listbox" aria-label="Commands">
          {list.map((i, k) => (
            <li key={i.label} id={`pal-o-${k}`} role="option" aria-selected={k === cur} className={k === cur ? "on" : undefined} onClick={() => run(i)}>
              {i.label}
              <small>{i.tag}</small>
            </li>
          ))}
        </ul>
        <p className="sr" role="status" aria-live="polite">
          {on ? (list.length ? `${list.length} command${list.length === 1 ? "" : "s"}` : "No matching command") : ""}
        </p>
      </div>
    </div>
  );
}
