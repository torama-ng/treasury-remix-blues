import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Lexend Deca", "Lexend", "sans-serif"],
      serif: ["Noto Serif", "Noto", "Serif"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
