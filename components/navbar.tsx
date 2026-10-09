"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

/** Solid bar: no backdrop blur on a sticky element (heavy on Safari). */
export const Navbar = () => {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = [
    { label: t("nav_cases"), href: "#cases" },
    { label: t("nav_work"), href: "#work" },
    { label: t("nav_arsenal"), href: "#arsenal" },
    { label: t("nav_contact"), href: "#contact" },
  ];

  const toggle = (
    <button
      type="button"
      onClick={() => setLocale(locale === "en" ? "id" : "en")}
      aria-label="Toggle language"
      className="chip flex items-center gap-1 uppercase tracking-wider"
    >
      <span className={locale === "en" ? "text-white" : ""}>EN</span>
      <span className="opacity-30">/</span>
      <span className={locale === "id" ? "text-white" : ""}>ID</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.09] bg-ink">
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-base font-bold tracking-tight">
          Jeremia Axelano
        </a>

        <nav className="hidden items-center gap-7 text-sm text-mist md:flex" aria-label="Primary">
          {items.map((i) => (
            <a key={i.href} href={i.href} className="transition-colors hover:text-white">
              {i.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">{toggle}</div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="chip flex h-9 w-9 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 top-0 h-0.5 w-4 bg-white transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[10px] h-0.5 w-4 bg-white transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="wrap flex flex-col gap-1 border-t border-white/[0.09] pb-4 pt-3 md:hidden">
          {items.map((i) => (
            <a key={i.href} href={i.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2.5 text-mist hover:bg-white/5 hover:text-white">
              {i.label}
            </a>
          ))}
          <div className="mt-2">{toggle}</div>
        </div>
      )}
    </header>
  );
};
