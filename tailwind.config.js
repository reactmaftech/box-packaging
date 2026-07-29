/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        secondary: '#FDB022',
        accent: '#0F766E',
        light: '#F9FAFB',
        dark: '#111827',
      },
    },
  },
  plugins: [],
}