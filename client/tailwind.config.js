/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-bg': '#FFFBF0',
        'neo-black': '#121212',
        'neo-white': '#FFFFFF',
        'neo-green': '#A3E635',
        'neo-blue': '#60A5FA',
        'neo-pink': '#F472B6',
        'neo-yellow': '#FACC15',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px #121212',
        'neo-hover': '2px 2px 0px 0px #121212',
        'neo-lg': '8px 8px 0px 0px #121212',
      }
    },
  },
  plugins: [],
}