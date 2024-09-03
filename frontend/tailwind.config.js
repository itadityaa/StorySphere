/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#97dbaf",
        bgSecondary: "#c2e6ae",
        highlightPrimary: "#f3e1a7",
        highlightSecondary: "#f4bbba",
      },
    },
  },
  plugins: [],
};
