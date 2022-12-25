/* eslint-disable @typescript-eslint/no-var-requires */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./lib/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        onPrimary: colors.white,
        success: colors.green,
        error: colors.red,
        warn: colors.yellow,
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    plugin(function ({ addVariant }) {
      addVariant("scrolled", "html.scrolled &");
      addVariant("not-scrolled", "html:not(.scrolled) &");
      addVariant("not-dark", "html:not(.dark) &");
    }),
  ],
};
