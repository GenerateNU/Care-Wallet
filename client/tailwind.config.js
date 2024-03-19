/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './components/**/*.tsx', './screens/**/*.tsx'],
  theme: {
    colors: {
      'carewallet-white': '#FFFFFF',
      'carewallet-black': '#000000',
      'carewallet-gray': '#BEBEBE',
      'carewallet-lightgray': '#D9D9D9',
      'carewallet-blue': '#1A56C4',
      'carewallet-green': '#4DB8A6',
      'carewallet-coral': '#FF6258',
      'carewallet-yellow': '#FFD9900',
      'carewallet-purple': '#990099',
      'carewallet-pink': '#FC2C51'
    }
  },
  plugins: []
};
