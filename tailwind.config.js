module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      cursor: ["disabled"],
      textColor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
