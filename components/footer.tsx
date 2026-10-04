"use client";

import { useI18n } from "@/lib/i18n";

export default function FooterSection() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/[0.09] py-10">
      <div className="wrap flex flex-col items-start justify-between gap-4 text-sm text-mist sm:flex-row sm:items-center">
        <p className="font-display text-base font-bold text-white">Jeremia Axelano</p>
        <p>{t("footer_note")}</p>
        <p className="font-mono text-xs">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
