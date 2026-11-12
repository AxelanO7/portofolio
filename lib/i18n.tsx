"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "id";

/**
 * Lightweight client-side i18n: navigation, hero, about and contact. Project copy stays
 * English on purpose, the audience is international. Choice persists in localStorage.
 */
const dict = {
  en: {
    nav_platform: "Platform",
    nav_system: "System",
    nav_cases: "Cases",
    nav_cities: "Cities",
    nav_agents: "Agents",
    nav_work: "Work",
    nav_about: "About",
    nav_contact: "Contact",
    nav_search: "Search",
    nav_menu: "Menu",
    hero_eyebrow: "Co-Founder & CTO at Guestlist Ticket",
    hero_title_a: "I build marketplaces, and",
    hero_title_b: "the agents that run them.",
    hero_sub: "Web, iOS, Android, back office and AI agents: six in daily use, a support agent in testing. Live in Bali, with venue pages in Las Vegas, Miami, Los Angeles and New\u00a0York.",
    hero_cta_cases: "See case studies",
    hero_cta_trailer: "Watch the 26-second version",
    state_live: "Live",
    about_eyebrow: "About",
    about_title: "I build platforms. Then I scale them.",
    about_bio: "I am the Co-Founder and CTO of Guestlist, a nightlife and experiences marketplace built for many countries: live in Bali, with venue pages in Las Vegas, Miami, Los Angeles and New York. I lead the engineering across the apps, the web platform and the back office, and I stay close to the code. Before that I led mobile teams at BTW Edutech and Jobseeker, and I build client platforms and Web3 sites as a freelancer.",
    about_principles: "Clear specs, small releases, honest status (\"live\" versus \"in build\"), and documentation that survives team changes.",
    about_base: "Based in Bali, UTC+8.",
    contact_eyebrow: "Work with me",
    contact_desc: "Full-stack, engineering leadership, AI agents or Web3: send a message and I will get back to you.",
    contact_call: "Book an intro call",
    contact_email: "Send an email",
    contact_whatsapp: "WhatsApp",
    contact_cv: "Download CV",
    footer_note: "Built end to end, no shortcuts.",
  },
  id: {
    nav_platform: "Platform",
    nav_system: "Sistem",
    nav_cases: "Studi kasus",
    nav_cities: "Kota",
    nav_agents: "Agent",
    nav_work: "Karya",
    nav_about: "Tentang",
    nav_contact: "Kontak",
    nav_search: "Cari",
    nav_menu: "Menu",
    hero_eyebrow: "Co-Founder & CTO di Guestlist Ticket",
    hero_title_a: "Saya membangun marketplace, dan",
    hero_title_b: "agent yang menjalankannya.",
    hero_sub: "Web, iOS, Android, back office, dan AI agent: enam dipakai harian, satu agent layanan pelanggan sedang diuji. Sudah live di Bali, dengan halaman venue di Las Vegas, Miami, Los Angeles, dan New\u00a0York.",
    hero_cta_cases: "Lihat studi kasus",
    hero_cta_trailer: "Tonton versi 26 detik",
    state_live: "Live",
    about_eyebrow: "Tentang",
    about_title: "Saya membangun platform. Lalu menumbuhkannya.",
    about_bio: "Saya Co-Founder dan CTO Guestlist, marketplace nightlife dan pengalaman yang dibangun untuk banyak negara: sudah live di Bali, dengan halaman venue di Las Vegas, Miami, Los Angeles, dan New York. Saya memimpin engineering di aplikasi, platform web dan back office, dan tetap dekat dengan kode. Sebelumnya saya memimpin tim mobile di BTW Edutech dan Jobseeker, dan membangun platform klien serta situs Web3 sebagai freelancer.",
    about_principles: "Spesifikasi jelas, rilis kecil, status yang jujur (\"live\" atau \"in build\"), dan dokumentasi yang bertahan saat tim berganti.",
    about_base: "Berbasis di Bali, UTC+8.",
    contact_eyebrow: "Bekerja dengan saya",
    contact_desc: "Full-stack, kepemimpinan engineering, AI agent atau Web3: kirim pesan dan saya akan membalas.",
    contact_call: "Jadwalkan panggilan perkenalan",
    contact_email: "Kirim email",
    contact_whatsapp: "WhatsApp",
    contact_cv: "Unduh CV",
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

  /* the page language follows the toggle (screen readers pick the voice from it) */
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

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
