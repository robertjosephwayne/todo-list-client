const defaultColors = require("tailwindcss/colors");
const customColors = require("./theme/colors");

module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        102: "25.5rem",
        
      },
      screens: {
        xs: "37.5rem",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: "#000",
      white: "#fff",

      cyan: customColors.cyan,
      gray: customColors.blueGray,
      indigo: customColors.indigo,
      pink: customColors.pink,
      red: customColors.red,
      yellow: customColors.yellow,
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
      visibility: ["group-hover"],
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
