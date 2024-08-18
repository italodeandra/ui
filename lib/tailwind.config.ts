import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

const config: Config = {
  darkMode: "class",
  content: [
    "./node_modules/@italodeandra/ui/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@italodeandra/auth/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        onPrimary: colors.white,
        success: colors.green,
        error: colors.red,
        warn: colors.yellow,
        current: "currentColor",
      },
      fontFamily: {
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
      },
      fontWeight: {
        inherit: "inherit",
      },
      scale: {
        flip: "-1",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          "0%": { opacity: "0", transform: "translateX(2px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        elasticSlideDownAndFade: {
          "0%": { opacity: "0", transform: "translateY(-4px) scale(0.8)" },
          "50%": { opacity: "1", transform: "translateY(1px) scale(1)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        elasticSlideLeftAndFade: {
          "0%": { opacity: "0", transform: "translateX(-4px) scale(0.8)" },
          "50%": { opacity: "1", transform: "translateX(-1px) scale(1)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        elasticSlideUpAndFade: {
          "0%": { opacity: "0", transform: "translateY(4px) scale(0.8)" },
          "50%": { opacity: "1", transform: "translateY(-1px) scale(1)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        elasticSlideRightAndFade: {
          "0%": { opacity: "0", transform: "translateX(4px) scale(0.8)" },
          "50%": { opacity: "1", transform: "translateX(1px) scale(1)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        pulsehide: {
          "0%, 100%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
      animation: {
        slideDownAndFade:
          "slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        elasticSlideDownAndFade:
          "elasticSlideDownAndFade 350ms cubic-bezier(0.16, 1, 0.3, 1)",
        elasticSlideLeftAndFade:
          "elasticSlideLeftAndFade 350ms cubic-bezier(0.16, 1, 0.3, 1)",
        elasticSlideUpAndFade:
          "elasticSlideUpAndFade 350ms cubic-bezier(0.16, 1, 0.3, 1)",
        elasticSlideRightAndFade:
          "elasticSlideRightAndFade 350ms cubic-bezier(0.16, 1, 0.3, 1)",
        fadeOut: "fadeOut 150ms ease-in",
        fadeIn: "fadeIn 150ms ease-in",
      },
    },
  },
  plugins: [
    typography,
    forms,
    plugin(function ({ addVariant }) {
      addVariant("scrolled", "html.scrolled &");
      addVariant("not-scrolled", "html:not(.scrolled) &");
      addVariant("not-dark", "html:not(.dark) &");
      addVariant("touch", "html.touch &");
    }),
  ],
};

export default config;
