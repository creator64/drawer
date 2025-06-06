/** @type {import('tailwindcss').Config} */
const { join } = require('path');
module.exports = {
  content: [join(__dirname, './src/**/*.{js,ts,jsx,tsx}'), join(__dirname, '../../index.html')],
  theme: {
    extend: {},
  },
  plugins: [],
};
