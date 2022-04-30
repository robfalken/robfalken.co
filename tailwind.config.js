module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: "Source Sans Pro",
        display: "Playfair Display",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
