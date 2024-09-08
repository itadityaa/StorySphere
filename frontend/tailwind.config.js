/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#001d3d",
        accentPrimary: "#e26d5c",
        bgSecondary: "#caf0f8 ",
      },
      fontFamily: {
        montserrat: ["Inter", "sans-serif"],
        playwrite: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
