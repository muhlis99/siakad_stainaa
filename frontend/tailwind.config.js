/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    },
    container: {
      padding: '1rem',
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '16': '4rem',
    },
    fontFamily: {
      'sans': ['Dosis', 'sans-serif'],
      'serif': ['times new roman', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    }
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0D6EFD",
          "secondary": "#6C757D",
          "accent": "#a6a6a6",
          "neutral": "#2b3440",
          "base-100": "#ffffff",
          "info": "#0DCAF0",
          "success": "#2D7F5F",
          "warning": "#fbbd23",
          "error": "#BB2D3B"
        }
      }
    ]
  },
}
