const colors = require("tailwindcss/colors");

module.exports = {
  // only use in the production
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
        white: colors.white,
        cadetblue: "#5f9ea0",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      extend: {
        spacing: {
          128: "32rem",
          144: "36rem",
        },
        borderRadius: {
          "4xl": "2rem",
        },
        transitionProperty: {
          height: "height",
        },
      },
    },
  },
  variants: {
    extend: {
      // opacity: ["disabled"],
      display: ["group-hover"],
      textOpacity: ["dark"],
    },
  },
  plugins: [],
  corePlugins: {
    wordBreak: true,
  },
};
