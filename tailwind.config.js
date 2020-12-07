module.exports = {
  purge: ["./src/**/*"],
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
