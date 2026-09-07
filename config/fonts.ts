import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

// One coherent typographic voice (Vercel's Geist) instead of three stitched
// Google Fonts — Geist Sans covers body copy AND display headlines (via
// weight, not a separate face), Geist Mono covers technical/label text.
export const fontSans = GeistSans;
export const fontMono = GeistMono;
