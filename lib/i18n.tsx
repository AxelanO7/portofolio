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
    stack_all: "All",
    hero_eyebrow: "CTO · Bali, UTC+8",
    hero_title_a: "I build and scale",
    hero_title_b: "marketplace platforms",
    hero_title_c: "and AI agents.",
    hero_sub: "From ticketing and booking to the agents that keep a small team running. Shipped on web, iOS and Android.",
    hero_cta_work: "See case studies",
    hero_cta_call: "Start a conversation",
    proof_visitors: "unique visitors",
    proof_bookings: "monthly booking requests",
    proof_partners: "partner businesses",
    proof_agents: "AI agents in daily use",
    work_eyebrow: "Work with me",
    work_title: "Three ways to start",
    work_about: "Based in Bali (UTC+8). Works async, with overlap for European mornings and US evenings.",
    about_eyebrow: "About",
    about_title: "How I work",
    about_bio: "I am the CTO of Guestlist, a nightlife and experiences marketplace built for many countries: live in Bali, launching in Las Vegas in October 2026, with more countries on the roadmap. I lead the engineering across the apps, the web platform and the back office, and I stay close to the code. Before that I led mobile teams at BTW Edutech and Jobseeker, and I build client platforms and Web3 sites as a freelancer.",
    about_principles: "Clear specs, small releases, honest status (\"live\" versus \"in build\"), and documentation that survives team changes.",
    contact_call: "Book an intro call",
    contact_cv: "Download CV",
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
    stack_all: "Semua",
    hero_eyebrow: "CTO · Bali, UTC+8",
    hero_title_a: "Saya membangun dan menumbuhkan",
    hero_title_b: "platform marketplace",
    hero_title_c: "dan AI agent.",
    hero_sub: "Dari ticketing dan booking sampai agent yang menjaga tim kecil tetap jalan. Sudah rilis di web, iOS dan Android.",
    hero_cta_work: "Lihat studi kasus",
    hero_cta_call: "Mulai ngobrol",
    proof_visitors: "pengunjung unik",
    proof_bookings: "permintaan booking bulanan",
    proof_partners: "bisnis partner",
    proof_agents: "AI agent dipakai harian",
    work_eyebrow: "Bekerja dengan saya",
    work_title: "Tiga cara memulai",
    work_about: "Berbasis di Bali (UTC+8). Kerja asinkron, dengan jam overlap untuk pagi Eropa dan malam AS.",
    about_eyebrow: "Tentang",
    about_title: "Cara saya bekerja",
    about_bio: "Saya CTO Guestlist, marketplace nightlife dan pengalaman yang dibangun untuk banyak negara: sudah live di Bali, meluncur di Las Vegas pada Oktober 2026, dengan negara lain di peta jalan. Saya memimpin engineering di aplikasi, platform web dan back office, dan tetap dekat dengan kode. Sebelumnya saya memimpin tim mobile di BTW Edutech dan Jobseeker, dan membangun platform klien serta situs Web3 sebagai freelancer.",
    about_principles: "Spesifikasi jelas, rilis kecil, status yang jujur (\"live\" atau \"in build\"), dan dokumentasi yang bertahan saat tim berganti.",
    contact_call: "Jadwalkan panggilan perkenalan",
    contact_cv: "Unduh CV",
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
