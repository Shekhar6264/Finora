/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030303',
          900: '#0a0a0b',
          800: '#121214',
          700: '#1a1a1e',
          600: '#2a2a2e',
        },
        brand: {
          primary: '#4f46e5',   // Indigo/Blue
          secondary: '#818cf8',
          accent: '#c084fc',    // Purple accent
          success: '#10b981',   // Emerald
          danger: '#f43f5e',    // Rose
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      },
      boxShadow: {
        'premium': '0 20px 50px -12px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 20px rgba(79, 70, 229, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
