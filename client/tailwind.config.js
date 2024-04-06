/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './components/**/*.tsx',
    './screens/**/*.tsx',
    './utils/**/*.tsx'
  ],
  theme: {
    colors: {
      'carewallet-white': '#FFFFFF',
      'carewallet-black': '#000000',
      'carewallet-gray': '#BEBEBE',
      'carewallet-lightgray': '#D9D9D9',
      'carewallet-lightergray': '#0000000D',
      'carewallet-blue': '#1A56C4',
      'carewallet-green': '#4DB8A6',
      'carewallet-coral': '#FF6258',
      'carewallet-yellow': '#FFD910',
      'carewallet-purple': '#990099',
      'carewallet-pink': '#FC2C51',
      'carewallet-orange': '#FF8310'
    },

    fontFamily: {
      'carewallet-manrope': ['Manrope_400Regular'],
      'carewallet-manrope-semibold': ['Manrope_600SemiBold'],
      'carewallet-manrope-bold': ['Manrope_700Bold'],
      'carewallet-montserrat': ['Montserrat_400Regular'],
      'carewallet-montserrat-semibold': ['Montserrat_600SemiBold'],
      'carewallet-montserrat-bold': ['Montserrat_700Bold']
    }
  },
  plugins: []
};
