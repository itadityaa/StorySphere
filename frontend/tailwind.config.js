/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#001d3d",
        accentPrimary: "#F9F6EE",
        bgSecondary: "#FFF8DC ",
        accentSecondary: "#d05549",
      },
      fontFamily: {
        montserrat: ["Inter", "sans-serif"],
        playwrite: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
