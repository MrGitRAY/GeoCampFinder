/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables class-based dark mode (e.g. <html class="dark">)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(-0.5rem) scale(0.95)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        'fade-out-down': {
          '0%': { opacity: 1, transform: 'translateY(0) scale(1)' },
          '100%': { opacity: 0, transform: 'translateY(0.5rem) scale(0.95)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 200ms ease-out forwards',
        'fade-out-down': 'fade-out-down 200ms ease-in forwards',
      },
    },
  },
  plugins: [],
};