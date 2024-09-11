/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#0d1b2a",
        accentPrimary: "#F9F6EE",
        bgSecondary: "#FFF8DC ",
        accentSecondary: "#d05549",
        adminC1b: "#ffc8dd",
        adminC2b: "#bde0fe",
        adminC1a: "#d62828",
        adminC2a: "#003049",
      },
      fontFamily: {
        montserrat: ["Inter", "sans-serif"],
        playwrite: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
