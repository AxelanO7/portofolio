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
    nav_cases: "Case studies",
    hero_eyebrow: "CTO · Bali, UTC+8",
    hero_title_a: "I build and scale",
    hero_title_b: "marketplace platforms",
    hero_title_c: "and AI agents.",
    hero_sub: "From ticketing and booking to the agents that keep a small team running. Shipped on web, iOS and Android.",
    hero_cta_work: "See case studies",
    hero_cta_call: "Start a conversation",
    proof_events: "events ticketed",
    proof_venues: "venues onboarded",
    proof_lighthouse: "Lighthouse, mobile",
    proof_agents: "AI agents in use",
    work_eyebrow: "Work with me",
    work_title: "Three ways to start",
    work_about: "Based in Bali (UTC+8). Works async, with overlap for European mornings and US evenings.",
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
    nav_cases: "Studi kasus",
    hero_eyebrow: "CTO · Bali, UTC+8",
    hero_title_a: "Saya membangun dan menumbuhkan",
    hero_title_b: "platform marketplace",
    hero_title_c: "dan AI agent.",
    hero_sub: "Dari ticketing dan booking sampai agent yang menjaga tim kecil tetap jalan. Sudah rilis di web, iOS dan Android.",
    hero_cta_work: "Lihat studi kasus",
    hero_cta_call: "Mulai ngobrol",
    proof_events: "event terjual tiketnya",
    proof_venues: "venue bergabung",
    proof_lighthouse: "Lighthouse, mobile",
    proof_agents: "AI agent dipakai",
    work_eyebrow: "Bekerja dengan saya",
    work_title: "Tiga cara memulai",
    work_about: "Berbasis di Bali (UTC+8). Kerja asinkron, dengan jam overlap untuk pagi Eropa dan malam AS.",
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
