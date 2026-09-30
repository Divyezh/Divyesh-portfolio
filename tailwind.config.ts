import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.12)",
        background: "#050508",
        surface: {
          DEFAULT: "#0a0814",
          subtle: "#0e0c1c",
          elevated: "#141026",
          border: "rgba(255, 255, 255, 0.1)",
        },
        vyro: {
          bg: "#050508",
          deep: "#090714",
          surface: "#0e0c1f",
          border: "rgba(255, 255, 255, 0.12)",
          indigo: "#6366F1",
          violet: "#818CF8",
          royal: "#4F46E5",
          cobalt: "#38BDF8",
          glow: "rgba(99, 102, 241, 0.35)",
        },
        purple: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#818cf8",
          600: "#6366f1",
          700: "#4f46e5",
          800: "#3730a3",
          900: "#1e1b4b",
          950: "#0c0a1f",
          light:  "#c4b5fd",
          mid:    "#818cf8",
          core:   "#6366f1",
          deep:   "#312e81",
          glow:   "rgba(99, 102, 241, 0.25)",
        },
      },
      spacing: {
        '75': '18.75rem',
        '110': '27.5rem',
        '145': '36.25rem',
        '150': '37.5rem',
        '160': '40rem',
        '180': '45rem',
        '220': '55rem',
        '265': '66.25rem',
      },
      backgroundImage: {
        "purple-gradient":
          "linear-gradient(90deg, #c4b5fd 0%, #818cf8 50%, #6366f1 100%)",
        "purple-radial":
          "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
        "vyro-radial":
          "radial-gradient(circle at 50% 25%, rgba(99, 102, 241, 0.35) 0%, rgba(79, 70, 229, 0.15) 40%, rgba(5, 5, 8, 0) 75%)",
        "vyro-crescent":
          "conic-gradient(from 180deg at 50% 50%, rgba(99, 102, 241, 0.4) 0deg, rgba(129, 140, 248, 0.15) 120deg, transparent 240deg)",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "gradient-x": "gradient-x 3s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
