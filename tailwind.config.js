const theme = require("./theme.json");
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  safelist: ["text-teal", "text-white", "text-blue", "text-yellow"],
  theme: {
    extend: {
      colors: theme.colors,
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-inherit-all": {
          "font-size": "inherit",
          color: "inherit",
          "font-weight": "inherit",
          "line-height": "inherit",
          "letter-spacing": "inherit",
          "font-family": "inherit",
          "text-align": "inherit",
        }
      });
    },
  ],
};