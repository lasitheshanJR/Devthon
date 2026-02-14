export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#22d3ee",
        glass: "rgba(255,255,255,0.1)",
      },
      backdropBlur: {
        glass: "12px",
      },
    },
  },
  plugins: [],
};
