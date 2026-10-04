"use client";

import { useI18n } from "@/lib/i18n";

const LINKS = [
  { label: "Email", value: "jeremia123.jm@gmail.com", href: "mailto:jeremia123.jm@gmail.com" },
  { label: "WhatsApp", value: "+62 822 4603 4453", href: "https://wa.me/6282246034453" },
  { label: "LinkedIn", value: "/in/jeremia-axelano", href: "https://linkedin.com/in/jeremia-axelano" },
  { label: "GitHub", value: "@AxelanO7", href: "https://github.com/AxelanO7" },
];

export default function ContactSection() {
  const { t } = useI18n();
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <p className="eyebrow">{t("contact_eyebrow")}</p>
        <h2 className="h2 max-w-[18ch]">{t("contact_title")}</h2>
        <p className="lead">{t("contact_desc")}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="mailto:jeremia123.jm@gmail.com" className="btn-cta">
            {t("contact_email")}
          </a>
          <a href="https://wa.me/6282246034453" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            {t("contact_whatsapp")}
          </a>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="card block p-4 transition-colors hover:border-white/30">
                <p className="font-mono text-[11px] uppercase tracking-widest text-cy">{l.label}</p>
                <p className="mt-1 break-words text-sm">{l.value}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
