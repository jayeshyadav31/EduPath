/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ['"Comic Sans MS"', 'cursive'], // Example with Comic Sans MS
      // Add more custom fonts here as needed
    },
  },
  plugins: [],
}