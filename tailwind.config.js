const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: "#000",
      white: "#fff",

      emerald: colors.emerald,
      gray: colors.blueGray,
      blue: colors.lightBlue,
      purple: colors.violet,
      red: colors.red,
      yellow: colors.yellow,
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
