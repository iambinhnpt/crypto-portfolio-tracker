/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'crypto-bg': "url('crypto-background.jpg')", // Add custom background image
      },
    },
  },
  plugins: [],
}

