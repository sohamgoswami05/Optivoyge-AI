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
        tbo: {
          orange: '#EA580C',
          'orange-hover': '#C2410C',
          'orange-subtle': '#FFF7ED',
          navy: '#0F172A',
          blue: '#1D4ED8',
          'blue-subtle': '#EFF6FF',
          green: '#059669',
          'green-subtle': '#F0FDF4',
          amber: '#D97706',
          'amber-subtle': '#FFFBEB',
          rose: '#DC2626',
          'rose-subtle': '#FEF2F2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '10px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
        'card': '0 0 0 1px rgba(226, 232, 240, 0.8), 0 1px 2px 0 rgba(15, 23, 42, 0.03)',
      }
    },
  },
  plugins: [],
}
