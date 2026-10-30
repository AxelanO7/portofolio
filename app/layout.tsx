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
 * Runs before first paint. Adds .js (reveal-on-view hides content only when script is present), decides whether the
 * intro plays (home page, first visit of the session, motion allowed, no ?nointro) and, if hydration has not finished after 5 s,
 * removes both so nothing stays hidden.
 */
const HEAD_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');var s=false;try{s=sessionStorage.getItem('ax-seen')==='1'}catch(e){}if(!s&&location.pathname==='/'&&!/[?&]nointro/.test(location.search)&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('ld-on');setTimeout(function(){if(!window.__axReady){d.classList.remove('js','ld-on')}},5000)})()`;

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
          <main id="main">{children}</main>
          <Footer />
          <Palette />
          <CursorLabel />
        </Providers>
      </body>
    </html>
  );
}
