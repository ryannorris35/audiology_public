import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // 50% — dominant light gray background
        linen: {
          DEFAULT: '#CDCECF',
          dark: '#B8BCBE',
        },
        // 30% — secondary, now white for contrast against gray background
        sage: {
          50: '#FFFFFF',
          100: '#F8F8F8',
          200: '#F0F0F0',
          300: '#FFFFFF',
          400: '#EBEBEB',
          500: '#E5E5E5',
          600: '#FFFFFF',
          700: '#F5F5F5',
          DEFAULT: '#FFFFFF',
        },
        // 20% — accent, used sparingly for CTAs and highlights
        clay: {
          DEFAULT: '#C17F59',
          dark: '#A1633F',
          light: '#E0B69B',
        },
        // text and dark surfaces
        bark: {
          DEFAULT: '#191B1D',
          light: '#3A3F47',
        },
        // secondary neutral for cards
        sand: {
          DEFAULT: '#FFFFFF',
          dark: '#F5F5F5',
        },
      },
      fontFamily: {
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
      keyframes: {
        'gentle-flash': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        ripple: {
          '0%': { transform: 'scaleX(0.85)', opacity: '0.5' },
          '50%': { transform: 'scaleX(1)', opacity: '1' },
          '100%': { transform: 'scaleX(0.85)', opacity: '0.5' },
        },
      },
      animation: {
        'gentle-flash': 'gentle-flash 1.5s ease-in-out infinite',
        ripple: 'ripple 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
