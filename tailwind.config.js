const theme = require("./theme.json");
export default {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist:[
    "text-teal",
    "text-white",
    "text-blue",
    "text-yellow"
  ],
  theme: {
    extend: {
      colors:theme.colors
    },
  },
  plugins: [],
}
