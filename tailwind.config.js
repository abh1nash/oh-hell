module.exports = {
  purge: ["./src/**/*"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "ping-slow": "ping 3s linear infinite",
      },
    },
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
