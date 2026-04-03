import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50: "#f0fdf9",
          100: "#ccfbef",
          200: "#99f6e0",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        accent: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        dark: {
          900: "#080c10",
          800: "#0d1117",
          700: "#161b22",
          600: "#21262d",
          500: "#30363d",
          400: "#484f58",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(20,184,166,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,184,166,0.05) 1px, transparent 1px)",
        "noise": "url('/noise.svg')",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        "glow-teal": "0 0 40px rgba(20,184,166,0.15)",
        "glow-purple": "0 0 40px rgba(139,92,246,0.15)",
        "card": "0 4px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
