import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#118AB2',
          light: '#2CB3DE',
          dark: '#0D6E8E',
          50: '#E8F6FA',
          100: '#D1EDF5',
          500: '#118AB2',
          600: '#0E7496',
          700: '#0B5A75',
        },
        secondary: {
          DEFAULT: '#7CD5C7',
          light: '#A3E3D9',
          dark: '#58BDB0',
          50: '#F0FAF8',
          100: '#E1F5F2',
          500: '#7CD5C7',
          600: '#5EBFB1',
        },
        tertiary: {
          DEFAULT: '#464B71',
          light: '#656B98',
          dark: '#303451',
          50: '#F3F4F8',
          100: '#E4E5F0',
          500: '#464B71',
          700: '#26293E',
        },
        neutral: {
          DEFAULT: '#F2F2ED',
          50: '#FAF9F6',
          100: '#F2F2ED',
          200: '#E5E5DE',
          300: '#D5D5CC',
        },
        brandNavy: '#1C234B',
        brandGold: '#F4C542',
        brandGoldLight: '#FEF8E7',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(70, 75, 113, 0.06)',
        'glow-primary': '0 0 20px rgba(17, 138, 178, 0.25)',
        'glow-secondary': '0 0 20px rgba(124, 213, 199, 0.35)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};

export default config;
