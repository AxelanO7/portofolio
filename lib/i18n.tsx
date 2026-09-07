"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "id";

/**
 * Lightweight client-side i18n (no routing change) — covers navigation,
 * hero, narrative and closing sections. Long-form case-study prose stays
 * English-primary by design: the audience is international hiring managers,
 * and translating every project description would dilute engineering effort
 * for little reach benefit. Toggle persists via localStorage.
 */
const dict = {
  en: {
    nav_work: "Work",
    nav_skills: "Skills",
    nav_contact: "Contact",
    nav_cta: "Let's talk",

    hero_badge: "Open to remote & international roles",
    hero_title_1: "Jeremia",
    hero_title_2: "Axelano",
    hero_role: "CTO · Full-Stack Engineer · AI R&D",
    hero_sub_1: "Strong engineering fundamentals, built",
    hero_sub_2: "before AI",
    hero_sub_3: "— now leading teams and R&D on",
    hero_sub_4: "AI agents & automation.",
    hero_cta_work: "Explore my work",
    hero_cta_cv: "Download CV",

    timeline_1_date: "Dec 2019",
    timeline_1_title: "Freelance Full-Stack",
    timeline_1_metric: "6+ yrs experience",
    timeline_2_date: "Aug 2021",
    timeline_2_title: "President, BEM INSTIKI",
    timeline_2_metric: "Led 114 members",
    timeline_3_date: "Aug 2022",
    timeline_3_title: "Mobile Lead @ BTW Edutech",
    timeline_3_metric: "Led mobile eng. team",
    timeline_4_date: "Sep 2024",
    timeline_4_title: "Sr Mobile Engineer @ Jobseeker",
    timeline_4_metric: "SaaS matching platforms",
    timeline_5_date: "Mar 2025",
    timeline_5_title: "CTO @ NDS",
    timeline_5_metric: "4 Guestlist platforms",

    arc_eyebrow: "The Arc",
    arc_title_1: "Strong",
    arc_title_2: "before AI",
    arc_title_3: ". Fluent in the",
    arc_title_4: "age of agents",
    arc_desc:
      "Most engineers are either pre-AI veterans or AI-era natives. My edge is being both — a decade of real systems, then building the AI that runs them.",
    arc_bridge: "carried over",
    arc_cta: "See the systems behind this",

    contact_eyebrow: "Contact",
    contact_title_1: "Let's build something",
    contact_title_2: "worth shipping",
    contact_desc:
      "Open to remote & international opportunities — full-stack, engineering leadership, or AI systems roles.",
    contact_cta_email: "Send an email",
    contact_cta_whatsapp: "WhatsApp",

    footer_note: "Built the way I build everything — end to end, no shortcuts.",
  },
  id: {
    nav_work: "Karya",
    nav_skills: "Keahlian",
    nav_contact: "Kontak",
    nav_cta: "Hubungi saya",

    hero_badge: "Terbuka untuk peran remote & internasional",
    hero_title_1: "Jeremia",
    hero_title_2: "Axelano",
    hero_role: "CTO · Full-Stack Engineer · AI R&D",
    hero_sub_1: "Fondasi engineering yang kuat, dibangun",
    hero_sub_2: "sebelum era AI",
    hero_sub_3: "— sekarang memimpin tim dan riset",
    hero_sub_4: "AI agent & otomasi.",
    hero_cta_work: "Lihat karya saya",
    hero_cta_cv: "Unduh CV",

    timeline_1_date: "Des 2019",
    timeline_1_title: "Freelance Full-Stack",
    timeline_1_metric: "6+ tahun pengalaman",
    timeline_2_date: "Agu 2021",
    timeline_2_title: "Presiden BEM INSTIKI",
    timeline_2_metric: "Memimpin 114 anggota",
    timeline_3_date: "Agu 2022",
    timeline_3_title: "Mobile Lead @ BTW Edutech",
    timeline_3_metric: "Memimpin tim mobile eng.",
    timeline_4_date: "Sep 2024",
    timeline_4_title: "Sr Mobile Engineer @ Jobseeker",
    timeline_4_metric: "Platform SaaS matching",
    timeline_5_date: "Mar 2025",
    timeline_5_title: "CTO @ NDS",
    timeline_5_metric: "4 platform Guestlist",

    arc_eyebrow: "Perjalanan",
    arc_title_1: "Kuat",
    arc_title_2: "sebelum AI",
    arc_title_3: ". Fasih di",
    arc_title_4: "era agent",
    arc_desc:
      "Kebanyakan engineer adalah veteran pra-AI atau native era-AI. Keunggulan saya ada di keduanya — satu dekade membangun sistem nyata, lalu membangun AI yang menjalankannya.",
    arc_bridge: "terbawa dari fondasi",
    arc_cta: "Lihat sistem di baliknya",

    contact_eyebrow: "Kontak",
    contact_title_1: "Ayo bangun sesuatu yang",
    contact_title_2: "layak dikirim",
    contact_desc:
      "Terbuka untuk peluang remote & internasional — full-stack, kepemimpinan engineering, atau peran sistem AI.",
    contact_cta_email: "Kirim email",
    contact_cta_whatsapp: "WhatsApp",

    footer_note: "Dibangun seperti biasa saya kerja — end to end, tanpa jalan pintas.",
  },
} as const;

export type DictKey = keyof typeof dict.en;

interface I18nCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: DictKey) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("locale");
    if (saved === "en" || saved === "id") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("locale", l);
  };

  const value = useMemo<I18nCtx>(
    () => ({
      locale,
      setLocale,
      t: (key) => dict[locale][key] ?? dict.en[key],
    }),
    [locale]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
