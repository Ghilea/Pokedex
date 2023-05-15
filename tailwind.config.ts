import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4e54c8",
        "primary-light": "#8f94fb",
        "primary-dark": "#2C0C3C",
        secondary: "#C45C4B",
        "p-black": "#222222", // Black
        "p-grey-light": "#F2F2F2", // Lighter gray
        "p-grey-darker": "#D1D1D1", //Darker gray
        "p-grey-darkest": "#8E8E8E", //Even darker gray
        "p-purple": "#AD45C7", //purple
        "p-yellow": "#FFDE0C", //yellow
        "p-blue": "#01DBDA", //Blue
        "p-green": "#05C579", //green
        "p-green-light": "#a2f0d5", //light green
        "p-orange": "#F69D00", // Orange
        "p-orange-light": "#ffe0ac", // Orange
        "p-red": "#FF4F66", // Red
        "p-red-light": "#ffc7d0", //lighter red
      },
      fontFamily: {
        pokemon: ["Pokemon solid", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
