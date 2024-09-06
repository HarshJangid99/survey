/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sectionthirdbg': "url('./src/assets/bgSection3.png')",
     
      }
    },
  },
  plugins: [],
}
