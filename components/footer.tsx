"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export default function FooterSection() {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-white/5 bg-ink px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full border border-white/15">
            <Image src="/a.png" alt="Jeremia Axelano" fill className="object-cover" sizes="24px" />
          </div>
          <p className="font-tech text-xs text-white/40">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white/70">Jeremia Axelano</span>
          </p>
        </div>
        <p className="font-tech text-[11px] text-white/30">{t("footer_note")}</p>
      </div>
    </footer>
  );
}
