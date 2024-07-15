/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    fontFamily:{
    'prec':["Bree Serif", 'serif'],
    'playwrite':["Playwrite HR", 'cursive']
    }
    },
  },
  plugins: [],
}

