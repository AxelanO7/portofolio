"use client";

import { Mark } from "@/components/ui";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  const again = () => {
    try {
      sessionStorage.removeItem("ax-seen");
    } catch {
      /* storage blocked */
    }
    window.location.assign("/");
  };
  return (
    <footer className="wrap">
      <div className="ft">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <Mark size={22} /> © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Jeremia Axelano · CTO, Bali (UTC+8)
        </span>
        <span>
          {t("footer_note")} · <button type="button" onClick={again}>replay intro</button>
        </span>
      </div>
    </footer>
  );
}
