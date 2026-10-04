import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { Navbar } from "@/components/navbar";
import FooterSection from "@/components/footer";
import { TOOL_COUNT } from "@/config/arsenal";
import { Providers } from "./providers";

const SITE = "https://portfolio.axelano.space";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Jeremia Axelano · CTO, AI agents and Web3",
    template: "%s · Jeremia Axelano",
  },
  description:
    `Jeremia Axelano is a CTO and full-stack engineer. Guestlist Ticket on web and mobile, AI agents, 44 Web3 sites and a ${TOOL_COUNT}-tool arsenal, built end to end.`,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Jeremia Axelano · CTO, AI agents and Web3",
    description: "A nightlife marketplace on web and mobile, a fleet of AI agents and 44 Web3 sites. One builder across the whole stack.",
    url: SITE,
    siteName: "Jeremia Axelano",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jeremia Axelano, CTO, AI agents and Web3" }],
  },
  twitter: { card: "summary_large_image", title: "Jeremia Axelano · CTO, AI agents and Web3", images: ["/og-image.png"] },
  alternates: { canonical: SITE },
};

export const viewport: Viewport = {
  themeColor: "#07151d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <FooterSection />
        </Providers>
      </body>
    </html>
  );
}
