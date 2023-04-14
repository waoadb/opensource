/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      container: {
        padding: '1rem',
      },
      fontFamily: {
        sans: ['var(--Inter)', ...fontFamily.sans],
      },
      minWidth: {
        9: '2.25rem',
        36: '9rem',
        60: '15rem',
      },
      maxWidth: {
        '1/2': '50%',
      },
      minHeight: {
        28: '7rem',
        70: '17.5rem',
        112: '28rem',
        '30vh': '30vh',
        '70vh': '70vh',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
