/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kuromi: {
          primary: '#000000',
          secondary: '#FFFFFF',
          accent: '#E91E63',
          purple: '#9C27B0',
          dark: '#1A1B3A',
          pink: '#FF69B4',
          lightPink: '#FFB6C1',
          darkPurple: '#6A1B9A'
        }
      },
      fontFamily: {
        'kuromi': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'kuromi-gradient': 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
        'kuromi-dark': 'linear-gradient(135deg, #1A1B3A 0%, #000000 100%)',
        'kuromi-light': 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
      }
    },
  },
  plugins: [],
}