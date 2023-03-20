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
    themes: ["light"]
  },
}
