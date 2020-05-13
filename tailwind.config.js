const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      backgroundOpacity: {
        90: "0.9",
      },
    },
  },
  plugins: [require("@tailwindcss/ui")],
};
