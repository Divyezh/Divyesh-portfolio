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
        border: "rgba(255, 255, 255, 0.15)",
        background: "#060611",
        purple: {
          light:  "#d8b4fe",
          mid:    "#a855f7",
          core:   "#8b5cf6",
          deep:   "#581c87",
          glow:   "rgba(139, 92, 246, 0.15)",
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
          "linear-gradient(90deg, #d8b4fe 0%, #a855f7 50%, #8b5cf6 100%)",
        "purple-radial":
          "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)",
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
