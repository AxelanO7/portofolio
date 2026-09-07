"use client";

import { m as motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ContactSection() {
  const { t } = useI18n();

  const methods = [
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: "jeremia123.jm@gmail.com", href: "mailto:jeremia123.jm@gmail.com" },
    { icon: <Phone className="h-5 w-5" />, label: "WhatsApp", value: "+62 822 4603 4453", href: "https://wa.me/6282246034453" },
    { icon: <LinkedinIcon className="h-5 w-5" />, label: "LinkedIn", value: "/in/jeremia-axelano", href: "https://linkedin.com/in/jeremia-axelano" },
    { icon: <GithubIcon className="h-5 w-5" />, label: "GitHub", value: "@AxelanO7", href: "https://github.com/AxelanO7" },
  ];

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-ink-elev py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-tech text-xs uppercase tracking-[0.28em] text-accent/80"
        >
          {t("contact_eyebrow")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl"
        >
          {t("contact_title_1")} <span className="underline decoration-2 underline-offset-4">{t("contact_title_2")}</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-lg text-base font-light leading-relaxed text-white/60"
        >
          {t("contact_desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="mailto:jeremia123.jm@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-ink transition-all hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(168,151,255,0.35)]"
          >
            {t("contact_cta_email")}
          </a>
          <a
            href="https://wa.me/6282246034453"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/[0.06]"
          >
            {t("contact_cta_whatsapp")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {methods.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass flex flex-col items-center gap-2 rounded-2xl border-white/8 px-4 py-5 transition-all hover:border-white/20"
            >
              <span className="text-accent">{m.icon}</span>
              <span className="text-xs font-semibold text-white">{m.label}</span>
              <span className="flex items-center gap-1 truncate text-[11px] text-white/40">
                {m.value}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-1.5 font-tech text-xs text-white/35"
        >
          <MapPin className="h-3.5 w-3.5" /> Bali, Indonesia · UTC+8
        </motion.p>
      </div>
    </section>
  );
}
