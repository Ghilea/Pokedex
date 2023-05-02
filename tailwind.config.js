/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4e54c8",
        "primary-light": "#8f94fb",
        "primary-dark": "#2C0C3C",
        secondary: "#C45C4B",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        pokemon: ["Pokemon solid", "sans-serif"],
      },
    },
  },
  plugins: [],
};
