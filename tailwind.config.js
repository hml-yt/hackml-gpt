/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./formkit.config.ts", "./formkit.theme.ts"],

  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-highlightjs"),
    require("@formkit/themes/tailwindcss"),
  ],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
  theme: {
    hljs: {
      theme: "atom-one-dark",
    },
  },
};
