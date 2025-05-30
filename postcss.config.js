const { resolve } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: resolve(__dirname, './packages/renderer/tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
