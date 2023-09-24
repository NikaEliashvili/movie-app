/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        imgTransition: {
          "0%": { transform: "translateY(-200px)", zIndex: "-1", opacity: "0" },
          "100%": { transform: "translateY(0)", zIndex: "1", opacity: "1" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out 1",
        imgTransition: "imgTransition 1s ease-in-out 1",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
