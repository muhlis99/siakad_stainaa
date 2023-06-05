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
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '16': '4rem',
    }
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-daisyui'),
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
          '.btn-default-activ': {
            'background-color': '#215E47',
            'border-color': '#215E47',
            'color': '#FFFFFF',
          },
          '.btn-default-outline': {
            'border-color': '#215E47',
          },
          '.btn-blue': {
            'background-color': '#0D6EFD',
            'border-color': '#0D6EFD',
          },
          '.btn-blue:hover': {
            'background-color': '#025ce3',
            'border-color': '#025ce3',
          },
          '.file-input-default': {
            'border-color': '#2D7F5F',
          },
          '.btn-default:focus': {
            'outline': '2px solid #2D7F5F'
          },
          '.file-input-default::file-selector-button': {
            'background': '#2D7F5F',
            'border-color': '#2D7F5F',
          },
        }
      },
    ],
  },
}
