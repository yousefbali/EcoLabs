/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Scans all files in the src directory
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Custom primary blue
        secondary: '#93C5FD', // Custom secondary purple
        background: '#FFFFFF', // Light gray background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern sans-serif font
        heading: ['Poppins', 'sans-serif'], // Font for headings
      },
    },
  },
  plugins: [],
};

