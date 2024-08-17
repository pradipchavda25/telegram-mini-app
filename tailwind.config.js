/** @type {import('tailwindcss').Config} */
const konstaConfig = require("konsta/config");

module.exports = konstaConfig({
  content: ["./src/**/*.{html,js}"],
  konsta: {
    colors: {
      // "primary" is the main app color, if not specified will be default to '#007aff'
      primary: "#101010",
    },
  },
  theme: {
    extend: {
      colors: {
        "ios-dark-surface": "#101010",
      },
    },
  },
  plugins: [],
});
