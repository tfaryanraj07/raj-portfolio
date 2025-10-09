/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode based on 'dark' class
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '33%': { transform: 'scale(1.1) translate(30px, -50px)' },
          '66%': { transform: 'scale(0.9) translate(-20px, 20px)' },
          '100%': { transform: 'scale(1) translate(0, 0)' },
        }
      },
      animation: {
        blob: 'blob 10s infinite cubic-bezier(0.4, 0, 0.6, 1)',
      }
    },
  },
  plugins: [],
}