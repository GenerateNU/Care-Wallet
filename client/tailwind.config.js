/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './components/**/*.tsx', './screens/**/*.tsx'],
  theme: {
    colors: {
      'carewallet-white': '#FFFFFF',
      'carewallet-black': '#000000',
      'carewallet-gray': '#BEBEBE',
      'carewallet-lightgray': '#D9D9D9'
    }
  },
  plugins: []
};
