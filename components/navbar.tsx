"use client";

import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useI18n } from "@/lib/i18n";
import { scrollToTarget } from "@/components/smooth-scroll";

export const Navbar = () => {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const navItems = [
    { label: t("nav_work"), href: "work" },
    { label: t("nav_skills"), href: "skills" },
    { label: t("nav_contact"), href: "contact" },
  ];

  const go = (val: string) => {
    setActive(val);
    setOpen(false);
    scrollToTarget(`#${val}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <NextLink href="/" className="group flex items-center gap-2.5">
          <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-white/15">
            <Image src="/a.png" alt="Jeremia Axelano" fill className="object-cover" sizes="32px" priority />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white transition-colors group-hover:text-white">
            Jeremia Axelano
          </span>
        </NextLink>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => go(item.href)}
                className={clsx(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  active === item.href
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop: locale toggle + CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "id" : "en")}
            aria-label="Toggle language"
            className="flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 font-tech text-[11px] font-semibold uppercase tracking-wider text-white/55 transition-colors hover:border-white/25 hover:text-white"
          >
            <span className={clsx(locale === "en" && "text-white")}>EN</span>
            <span className="text-white/20">/</span>
            <span className={clsx(locale === "id" && "text-white")}>ID</span>
          </button>
          <button
            onClick={() => go("contact")}
            className="rounded-xl bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(201,168,117,0.35)]"
          >
            {t("nav_cta")}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 transition-colors hover:bg-white/5 md:hidden"
        >
          <span className={clsx("h-0.5 w-4 rounded bg-white/80 transition-transform duration-300", open && "translate-y-1 rotate-45")} />
          <span className={clsx("h-0.5 w-4 rounded bg-white/80 transition-transform duration-300", open && "-translate-y-1 -rotate-45")} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass flex flex-col gap-1 border-t border-white/5 px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => go(item.href)}
              className="w-full rounded-lg px-2 py-2.5 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="mt-2 w-full rounded-xl bg-white py-3 text-center text-xs font-bold uppercase tracking-wider text-ink"
          >
            {t("nav_cta")}
          </button>
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "id" : "en")}
            className="mt-1 flex items-center justify-center gap-1 rounded-lg border border-white/10 py-2 font-tech text-[11px] font-semibold uppercase tracking-wider text-white/55"
          >
            <span className={clsx(locale === "en" && "text-white")}>EN</span>
            <span className="text-white/20">/</span>
            <span className={clsx(locale === "id" && "text-white")}>ID</span>
          </button>
        </div>
      )}
    </nav>
  );
};
