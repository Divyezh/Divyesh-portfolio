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
        background: "#0e070c",
        purple: {
          50: "#fff5f0",
          100: "#ffe6d7",
          200: "#FFC59E",
          300: "#FF9F9A",
          400: "#FF9F9A",
          500: "#E66277",
          600: "#AD4161",
          700: "#8F3858",
          800: "#562747",
          900: "#39192f",
          950: "#1a0e16",
          light:  "#FFC59E",
          mid:    "#FF9F9A",
          core:   "#E66277",
          deep:   "#562747",
          glow:   "rgba(230, 98, 119, 0.15)",
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
          "linear-gradient(90deg, #FFC59E 0%, #FF9F9A 50%, #E66277 100%)",
        "purple-radial":
          "radial-gradient(ellipse at center, rgba(230,98,119,0.15) 0%, transparent 70%)",
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
