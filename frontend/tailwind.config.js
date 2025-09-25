// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#98297",   // example blue
        secondary: "#9333EA", // example purple
      },
    },
  },
  plugins: [],
}
