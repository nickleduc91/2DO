/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
      desktop: "2300px",
    },
    extend: {
      colors: {
        beige: "#fdf5df",
      },
      fontFamily: {
        dispay: [""],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 400ms ease-in-out",
        bounce: "bounce 1s ease-in-out 1",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
