/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Lato"', 'sans-serif']
    },
    extend: {},
  },
  // eslint-disable-next-line
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}

