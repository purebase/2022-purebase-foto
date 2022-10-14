module.exports = {
  content: [
      'node_modules/daisyui/dist/**/*.js',
      './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};