/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'creme': '#F5F5DC',
        'coffee': '#6F4E37',
        'terracotta': '#E2725B',
        'sage-green': '#8A9A5B',
        'light-gray': '#D3D3D3',
      },
      fontFamily: {
        'sans': ['"Poppins"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}