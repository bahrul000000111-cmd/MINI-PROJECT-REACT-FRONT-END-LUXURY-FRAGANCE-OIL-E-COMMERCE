/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'frag-cream': '#F3F0E9',
        'frag-dark': '#1A1A1A',
        'frag-gray': '#717171',
        'frag-border': '#E5E1D8',
      },
      fontFamily: {
        'serif': ['Optima', 'Didot', 'serif'], 
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}