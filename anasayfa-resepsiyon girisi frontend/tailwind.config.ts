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
        ogm: {
          50:  "#f0f7f0",
          100: "#d9ecd9",
          200: "#b3d9b3",
          300: "#7dba7d",
          400: "#4d9a4d",
          500: "#2d7a2d",
          600: "#1e5c1e",
          700: "#1a4a1a",
          800: "#163d16",
          900: "#0f2a0f",
          950: "#091a09",
        },
        bej: {
          50: "#fdfbf7",
          100: "#faf7f0",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
