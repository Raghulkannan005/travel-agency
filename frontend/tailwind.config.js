/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'travel-blue': '#1a73e8',
        'travel-teal': '#34d399',
        'travel-orange': '#f97316',
        'travel-yellow': '#fbbf24',
        'travel-dark': '#1f2937',
        'travel-light': '#f9fafb'
      },
      textColor: {
        'nav-light': '#ffffff',
        'nav-accent': '#fbbf24',
        'form-label': '#374151',
        'form-text': '#111827',
        'btn-text': '#ffffff',
      }
    },
  },
  plugins: [],
}