module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: "Merriweather",
        display: "Orelega One",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
