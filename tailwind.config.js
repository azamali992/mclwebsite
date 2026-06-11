/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mclRed: '#c1272d', // MCL brand red
        mclDark: '#1a1a1a', // Dark theme background
      }
    },
  },
  plugins: [],
}