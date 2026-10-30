import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { Navbar } from "@/components/nav";
import Footer from "@/components/footer";
import FxRoot from "@/components/fx-root";
import Intro from "@/components/intro";
import Palette from "@/components/palette";
import CursorLabel from "@/components/cursor-label";
import { TOOL_COUNT } from "@/config/arsenal";
import { SITE_URL } from "@/config/site";
import { Providers } from "./providers";

const TITLE = "Jeremia Axelano · CTO, marketplaces and AI agents";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Jeremia Axelano" },
  description: `Jeremia Axelano is a CTO and full-stack engineer in Bali. Guestlist Ticket on web and mobile, AI agents in daily use, 44 Web3 sites and a ${TOOL_COUNT}-tool arsenal, built end to end.`,
  openGraph: {
    title: TITLE,
    description: "A nightlife marketplace on web and mobile, a fleet of AI agents and 44 Web3 sites. One builder across the whole stack.",
    url: SITE_URL,
    siteName: "Jeremia Axelano",
    type: "website",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630, alt: "Jeremia Axelano, CTO, marketplaces and AI agents" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, images: ["/og-image.jpg?v=2"] },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#050f16",
  width: "device-width",
  initialScale: 1,
};

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jeremia Axelano",
  alternateName: "Axel",
  jobTitle: "Chief Technology Officer",
  url: SITE_URL,
  worksFor: { "@type": "Organization", name: "Guestlist", url: "https://guestlistticket.com" },
  address: { "@type": "PostalAddress", addressLocality: "Denpasar", addressRegion: "Bali", addressCountry: "ID" },
  knowsAbout: ["Marketplace platforms", "AI agents", "Mobile apps", "Cloud infrastructure", "Web3"],
  sameAs: ["https://www.linkedin.com/in/jeremia-axelano/", "https://github.com/AxelanO7", "https://link.axelano.space"],
};

/**
 * Runs before first paint. Adds .js (reveal-on-view hides content only when script is present) and decides whether the intro plays
 * (home page, first visit of the session, motion allowed, no ?nointro). The intro itself is a CSS timeline (styles/fx.css), so this script
 * only adds ld-on, marks the session, lets a tap or key skip it (ld-skip fades the layer out) and drops ld-on when the curtain animation ends
 * (animationend, so it follows the real clock of the animation, not the time the script ran; 8 s fallback).
 * If hydration has not finished after 5 s it also drops .js, so nothing stays hidden.
 */
const HEAD_SCRIPT = `(function(){var d=document.documentElement,c=d.classList;c.add('js');var s=false;try{s=sessionStorage.getItem('ax-seen')==='1'}catch(e){}if(!s&&location.pathname==='/'&&!/[?&]nointro/.test(location.search)&&!matchMedia('(prefers-reduced-motion: reduce)').matches){c.add('ld-on');try{sessionStorage.setItem('ax-seen','1')}catch(e){}var off=function(){removeEventListener('animationend',end);removeEventListener('pointerdown',skip);removeEventListener('keydown',skip);c.remove('ld-on')},end=function(e){if(e.animationName==='ldbg')off()},skip=function(){if(c.contains('ld-skip'))return;c.add('ld-skip');setTimeout(off,300)};addEventListener('animationend',end);addEventListener('pointerdown',skip);addEventListener('keydown',skip);setTimeout(off,8000)}setTimeout(function(){if(!window.__axReady)c.remove('js')},5000)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }} />
        <a className="skip" href="#main">Skip to content</a>
        <Providers>
          <Intro />
          <FxRoot />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <Palette />
          <CursorLabel />
        </Providers>
      </body>
    </html>
  );
}
