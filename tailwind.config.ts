import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1e3a5f',
        navyDeep: '#16354f',
        wine: '#a8455a',
        wineDark: '#8c3548',
        lilac: '#a58bc4',
        sage: '#8ba888',
        cream: '#f6f1ea',
        blush: '#f0d5d3',
        rose: '#e8b4b0',
        ink: '#2a2a2a',
        muted: '#6b6b6b',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        phone: '3rem',
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(30, 58, 95, 0.10)',
        card: '0 2px 12px -2px rgba(30, 58, 95, 0.08)',
        phone: '0 30px 80px -20px rgba(22, 53, 79, 0.45)',
      },
    },
  },
  plugins: [],
} satisfies Config
