/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jade: {
          50: '#f0fdf7',
          100: '#dbfbe9',
          200: '#baf6d5',
          300: '#86ecb9',
          400: '#4cd997',
          500: '#23bd7a',
          600: '#169a61',
          700: '#137a4f',
          800: '#126140',
          900: '#062319',
          950: '#03140e',
        },
        ceylon: {
          50: '#fbf7ee',
          100: '#f6ecd6',
          200: '#ebd7ad',
          300: '#debd7c',
          400: '#d48b38',
          500: '#c87a28',
          600: '#b5641f',
          700: '#944b1c',
          800: '#783c1d',
          900: '#64331c',
          950: '#391a0c',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
