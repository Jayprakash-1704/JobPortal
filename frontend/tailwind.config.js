// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paleMint: '#ddf7e9',
        
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
