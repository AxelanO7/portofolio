import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { Navbar } from "@/components/nav";
import Footer from "@/components/footer";
import FxRoot from "@/components/fx-root";
import Intro from "@/components/intro";
import Palette from "@/components/palette";
import CursorLabel from "@/components/cursor-label";
import { rootMetadata } from "@/lib/seo";
import { Providers } from "./providers";

/** Title, descriptions, canonical, share card and robots: lib/seo.ts. Structured data: lib/jsonld.ts, rendered per page. */
export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: "#050f16",
  width: "device-width",
  initialScale: 1,
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
        <a className="skip" href="#main">Skip to content</a>
        <Providers>
          <Intro />
          <FxRoot />
          <Navbar />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
          <Palette />
          <CursorLabel />
        </Providers>
      </body>
    </html>
  );
}
