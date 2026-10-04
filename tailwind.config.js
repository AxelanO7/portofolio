/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Midnight navy + one cyan, gold only for emphasis (same family as Guestlist Ticket)
        ink: { DEFAULT: "#07151d", deep: "#031018", surface: "#0f1d25", raised: "#142129" },
        cy: { DEFAULT: "#22d3ee", soft: "#7decf4", mid: "#38bdf8" },
        gold: "#d4af6a",
        mist: "#a5b9cc",
        faint: "#8fadc2",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
