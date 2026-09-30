/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        freeskiers: {
          cyan: '#098ACB',
          lightcyan: '#04A4CC',
          navy: '#1B365D',
          dark: '#0F172A',
          charcoal: '#424242',
          snow: '#FFFFFF',
          lightgray: '#F7F7F7',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(9, 138, 203, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 28px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 30px -4px rgba(9, 138, 203, 0.15)',
      }
    },
  },
  plugins: [],
}
