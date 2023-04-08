/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      slate: colors.slate,
      gray: colors.gray,
      red: colors.red,
      primary: {
        DEFAULT: '#F6BD60',
        dark: '#AC8443',
      },
      error: '#D63230',
    },
  },
  plugins: [],
}
