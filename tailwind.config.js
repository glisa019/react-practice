/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--text-color)',
        secondary: 'var(--background-color)',
        tertiary: 'var(--border-color)'
      },
      fontFamily: {
        custom: 'var(--font-family)',
      },
    },
  },
  plugins: [],
}

