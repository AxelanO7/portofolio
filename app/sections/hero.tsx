"use client";

import { Mark, PhoneFrame } from "@/components/ui";
import { heroPhone } from "@/config/media";
import { useI18n } from "@/lib/i18n";
import { v } from "@/lib/css";

export default function HeroSection() {
  const { t } = useI18n();
  return (
    <section className="sec hr" id="top" data-pausable>
      <div className="hr-rays" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="wrap hr-in">
        <div>
          <span className="chip prof rise">
            <Mark size={40} />
            <span className="dec">{t("hero_eyebrow")}</span>
          </span>
          <h1 className="rise" style={v({ "--d": ".08s" })}>
            {t("hero_title_a")} <span className="shine">{t("hero_title_b")}</span>
          </h1>
          <p className="lead rise" style={v({ "--d": ".16s" })}>
            {t("hero_sub")}
          </p>
          <div className="hr-cta rise" style={v({ "--d": ".24s" })}>
            <a className="btn pri beam" href="#cases">
              {t("hero_cta_cases")} <span aria-hidden="true">↗</span>
            </a>
            <a className="btn pulse" href="#trailer">
              {t("hero_cta_trailer")} <span aria-hidden="true">▶</span>
            </a>
          </div>
          <div className="hr-states rise" style={v({ "--d": ".32s" })}>
            <span className="chip">
              <span className="dot" />
              Bali <small>{t("state_live")}</small>
            </span>
            <span className="chip">
              <span className="dot off" />
              Las Vegas <small>Oct 2026</small>
            </span>
            <span className="chip">
              <span className="dot off" />
              Next city <small>TBA</small>
            </span>
          </div>
        </div>
        <div className="hr-stack">
          <div className="hr-glow" />
          <PhoneFrame className="ph l" img={heroPhone("gl-nightlife")} priority low />
          <PhoneFrame className="ph r" img={heroPhone("gl-ticket")} priority low />
          <PhoneFrame className="ph c" img={heroPhone("gl-home")} priority alt="Guestlist Ticket app, Home screen" />
          <div className="hr-float f1">
            <i>QR</i>
            <div>
              <b>Ticket ready</b>
              <span>Show it at the door</span>
            </div>
          </div>
          <div className="hr-float f2">
            <i>100k</i>
            <div>
              <b>100,000+ visits</b>
              <span>tracked in production</span>
            </div>
          </div>
          <div className="hr-float f3">
            <i>AI</i>
            <div>
              <b>6 agents</b>
              <span>in daily use</span>
            </div>
          </div>
          <div className="hr-float f4">
            <i>110</i>
            <div>
              <b>110+ partners</b>
              <span>venues and operators</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
