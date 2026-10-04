"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "id";

/**
 * Lightweight client-side i18n: navigation, hero and contact. Project copy stays
 * English on purpose, the audience is international. Choice persists in localStorage.
 */
const dict = {
  en: {
    nav_work: "Work",
    nav_arsenal: "Arsenal",
    nav_contact: "Contact",
    hero_eyebrow: "CTO · AI agents · Web3",
    hero_sub: "The stack behind a nightlife marketplace, 44 Web3 sites and a fleet of AI agents. Tap a color to isolate one stack.",
    hero_cta_work: "Explore my work",
    hero_cta_cv: "Download CV",
    hero_all: "All",
    proof_tools: "tools in the arsenal",
    proof_agents: "AI agents",
    proof_web3: "Web3 sites",
    proof_platforms: "Guestlist platforms",
    contact_eyebrow: "Contact",
    contact_title: "Let's build something worth shipping",
    contact_desc: "Full-stack, engineering leadership, AI agents or Web3: send a message and I will get back to you.",
    contact_email: "Send an email",
    contact_whatsapp: "WhatsApp",
    footer_note: "Built end to end, no shortcuts.",
  },
  id: {
    nav_work: "Karya",
    nav_arsenal: "Arsenal",
    nav_contact: "Kontak",
    hero_eyebrow: "CTO · AI agent · Web3",
    hero_sub: "Stack di balik marketplace nightlife, 44 situs Web3 dan sekumpulan AI agent. Ketuk satu warna untuk menyorot satu stack.",
    hero_cta_work: "Lihat karya saya",
    hero_cta_cv: "Unduh CV",
    hero_all: "Semua",
    proof_tools: "tool di arsenal",
    proof_agents: "AI agent",
    proof_web3: "situs Web3",
    proof_platforms: "platform Guestlist",
    contact_eyebrow: "Kontak",
    contact_title: "Ayo bangun sesuatu yang layak dikirim",
    contact_desc: "Full-stack, kepemimpinan engineering, AI agent atau Web3: kirim pesan dan saya akan membalas.",
    contact_email: "Kirim email",
    contact_whatsapp: "WhatsApp",
    footer_note: "Dibangun end to end, tanpa jalan pintas.",
  },
} as const;

export type DictKey = keyof typeof dict.en;

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: DictKey) => string;
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("locale");
      if (saved === "en" || saved === "id") setLocaleState(saved);
    } catch {
      /* storage blocked */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      setLocale: (l) => {
        setLocaleState(l);
        try {
          window.localStorage.setItem("locale", l);
        } catch {
          /* storage blocked */
        }
      },
      t: (key) => dict[locale][key] ?? dict.en[key],
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
