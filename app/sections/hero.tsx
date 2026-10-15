"use client";

import { PhoneFrame } from "@/components/ui";
import { PHOTO, heroPhone } from "@/config/media";
import { useI18n } from "@/lib/i18n";
import { v } from "@/lib/css";

export default function HeroSection() {
  const { t } = useI18n();
  return (
    <section className="sec hr" id="top" data-pausable>
      <div className="hr-bg">
        {/* sizes understates the width on purpose: the photo sits under a dark gradient, so phones fetch the 900 px file */}
        <img
          src={PHOTO.hero.src}
          srcSet={`${PHOTO.hero.srcMobile} ${PHOTO.hero.wMobile}w, ${PHOTO.hero.src} ${PHOTO.hero.w}w`}
          sizes="(max-width: 700px) 300px, 100vw"
          width={PHOTO.hero.w}
          height={PHOTO.hero.h}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hr-rays" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="wrap hr-in">
        <div>
          <span className="chip rise">
            <span className="dot" />
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
            <i>30k</i>
            <div>
              <b>30,000+ visitors</b>
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
