/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FDF6E3', // Cream
          text: '#3E2723', // Deep Brown
          primary: '#A0522D', // Terracotta/Sienna
          secondary: '#556B2F', // Olive Green
          accent: '#F2EAD3', // Light Beige
        }
      },
    },
  },
  plugins: [],
}
