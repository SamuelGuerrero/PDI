/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        principal: "#028f76",
        secundario: "#1c2130",
        rojo: "#d14334",
      },
      fontFamily:{
        ramptartOne: ['Rampart One'],
      }
    },
  },
  plugins: [],
};
