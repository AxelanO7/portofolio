import { colors, nextui } from "@nextui-org/theme";
import { color } from "framer-motion";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        c_black: "#131313",
        c_dark_gray: "#1e1f21",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
