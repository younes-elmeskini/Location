/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5937E0',
        'secondary': '#FF9E0C',
        'black': '#000000',
        'black60': '#00000060',
        'greylight': '#fafafa',
        'grey50':'#ADB5BD'
      },
    },
  },
  plugins: [],
}