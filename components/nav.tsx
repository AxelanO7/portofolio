"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Mark } from "@/components/ui";
import { MotionSwitch } from "@/components/motion";
import { useI18n, type DictKey } from "@/lib/i18n";
import { EV, emit } from "@/lib/events";
import { inertExcept, lockScroll } from "@/lib/modal";

const LINKS: { id: string; key: DictKey }[] = [
  { id: "platform", key: "nav_platform" },
  { id: "system", key: "nav_system" },
  { id: "cases", key: "nav_cases" },
  { id: "atlas", key: "nav_cities" },
  { id: "agents", key: "nav_agents" },
  { id: "work", key: "nav_work" },
  { id: "about", key: "nav_about" },
];

/** Which pill lights up for which section while reading. */
const SECTION_TO_LINK: Record<string, string> = {
  platform: "platform", system: "system", live: "system", cases: "cases", atlas: "atlas", agents: "agents",
  wall: "work", work: "work", terminal: "work", about: "about", arsenal: "about",
};

/** Solid bar: no backdrop blur on a sticky element (heavy on Safari). */
export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const home = usePathname() === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const np = useRef<HTMLElement>(null);
  const hd = useRef<HTMLElement>(null);
  const ov = useRef<HTMLElement>(null);
  const hb = useRef<HTMLButtonElement>(null);

  /* which section is being read */
  useEffect(() => {
    if (!home || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) setActive(SECTION_TO_LINK[e.target.id] || "");
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(SECTION_TO_LINK).concat(["top", "trailer", "contact"]).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [home]);

  /* slide the pill to the active link */
  useEffect(() => {
    const nav = np.current;
    if (!nav) return;
    const place = () => {
      const ind = nav.querySelector<HTMLElement>(".ind");
      const a = active ? nav.querySelector<HTMLElement>(`a[data-id="${active}"]`) : null;
      if (!ind) return;
      if (!a) {
        ind.style.opacity = "0";
        return;
      }
      ind.style.opacity = "1";
      ind.style.width = `${a.offsetWidth}px`;
      ind.style.transform = `translateX(${a.offsetLeft - 4}px)`;
    };
    place();
    const timer = window.setTimeout(place, 400);
    window.addEventListener("resize", place);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", place);
    };
  }, [active, locale]);

  /* menu overlay: lock the page behind it (scroll, focus, screen readers), close with Escape and give focus back to the button, close when the bar turns into the desktop one */
  useEffect(() => {
    if (!open) return;
    const unlock = lockScroll();
    const unInert = inertExcept([hd.current, ov.current]);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      hb.current?.focus({ preventScroll: true });
    };
    const wide = window.matchMedia("(min-width: 1021px)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      unInert();
      unlock();
    };
  }, [open]);

  const href = (id: string) => `/#${id}`;
  const lang = (cls: string) => (
    <button type="button" className={`lang ${cls}`} onClick={() => setLocale(locale === "en" ? "id" : "en")}>
      <span className="sr">{locale === "en" ? "Language: English. Switch to Indonesian. " : "Bahasa: Indonesia. Ganti ke Inggris. "}</span>
      <span lang="en" className={locale === "en" ? "on" : ""}>EN</span>/<span lang="id" className={locale === "id" ? "on" : ""}>ID</span>
    </button>
  );

  return (
    <>
      <MotionSwitch className="skip" label="Pause motion" />
      <header className="nv" ref={hd}>
        <div className="wrap">
          <a className="brand" href="/#top">
            <Mark />
            Jeremia Axelano
          </a>
          <nav className="np" ref={np} aria-label="Primary">
            <span className="ind" />
            {LINKS.map((l) => (
              <a key={l.id} href={href(l.id)} data-id={l.id} className={active === l.id ? "on" : undefined} aria-current={active === l.id ? "true" : undefined}>
                {t(l.key)}
              </a>
            ))}
          </nav>
          <button type="button" className="kb" onClick={() => emit(EV.palette)} aria-haspopup="dialog" aria-keyshortcuts="Meta+K Control+K">
            {t("nav_search")} <kbd>⌘K</kbd>
          </button>
          {lang("d")}
          <a className="btn sm nv-cta" href={href("contact")}>
            {t("nav_contact")}
          </a>
          <button type="button" className="hb" ref={hb} aria-label={t("nav_menu")} aria-expanded={open} aria-controls="ov" onClick={() => setOpen((v) => !v)}>
            <i />
            <i />
          </button>
        </div>
      </header>
      <nav className={`ov${open ? " open" : ""}`} id="ov" ref={ov} aria-label={t("nav_menu")}>
        {LINKS.map((l, i) => (
          <a key={l.id} href={href(l.id)} style={{ ["--i" as string]: i }} onClick={() => setOpen(false)}>
            {t(l.key)}
          </a>
        ))}
        <a href={href("contact")} style={{ ["--i" as string]: LINKS.length }} onClick={() => setOpen(false)}>
          {t("nav_contact")}
        </a>
        <button type="button" className="ovk" style={{ ["--i" as string]: LINKS.length + 1 }} onClick={() => { setOpen(false); emit(EV.palette); }}>
          {t("nav_search")}
        </button>
        <div style={{ marginTop: 18 }}>{lang("")}</div>
        <small>Bali · UTC+8</small>
      </nav>
    </>
  );
}
