import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jeremia Axelano",
    short_name: "Axelano",
    description: "CTO, marketplaces and AI agents. Bali, UTC+8.",
    start_url: "/",
    display: "standalone",
    background_color: "#050f16",
    theme_color: "#050f16",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
