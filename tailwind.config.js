/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF0080",   // pink
        secondary: "#000000", // black
        lightpink: "#FFE5F0",
        pink: { 
          500: "#ec4899",
          600: "#db2777"
        }
    
      },
    },
  },
  plugins: [],
}
