import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontSans, fontMono } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import FooterSection from "../components/footer";
import { Providers } from "./providers";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={clsx(fontSans.variable, fontMono.variable)}
    >
      <head />
      <body
        className="min-h-screen font-sans antialiased overflow-x-hidden grain"
        suppressHydrationWarning
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <SmoothScroll />
          <div className="relative flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="flex-grow w-full">{children}</main>
            <FooterSection />
          </div>
        </Providers>
      </body>
    </html>
  );
}
