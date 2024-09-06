/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#001d3d",
        // bgSecondary: "#c2e6ae",
        // highlightPrimary: "#f3e1a7",
        // highlightSecondary: "#f4bbba",
        accentPrimary: "#e26d5c",
      },
      fontFamily: {
        montserrat: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
