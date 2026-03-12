import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0C0C0C",
          dark: "#1A1A1A",
          gray: "#666666",
          cream: "#F5F1E8",
          navy: "#1A2A3A",
          red: "#FF3B30",
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Helvetica Neue", "sans-serif"],
        display: ["var(--font-montserrat)", "Futura", "sans-serif"],
      },
      letterSpacing: {
        logo: "0.3em",
        wide: "0.1em",
      },
      fontSize: {
        hero: ["4.5rem", { lineHeight: "1.1", fontWeight: "300" }],
        "hero-mobile": ["2.5rem", { lineHeight: "1.15", fontWeight: "300" }],
        section: ["3rem", { lineHeight: "1.2", fontWeight: "300" }],
        "section-mobile": [
          "2rem",
          { lineHeight: "1.25", fontWeight: "300" },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
