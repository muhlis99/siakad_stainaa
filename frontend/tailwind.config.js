/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      padding: '1rem',
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          '.btn-danger': {
            'background-color': '#BB2D3B',
            'border-color': '#BB2D3B',
          },
          '.btn-danger:hover': {
            'background-color': '#B11B1B',
            'border-color': '#B11B1B',
          },
          '.btn-default': {
            'background-color': '#2D7F5F',
            'border-color': '#2D7F5F',
          },
          '.btn-default:hover': {
            'background-color': '#215E47',
            'border-color': '#215E47',
          },
        },
      },
    ],
  },
}
