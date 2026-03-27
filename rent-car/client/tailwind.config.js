/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",       // main color
        "primary-dull": "#4338ca",
        light: "#f1f5f9" ,// hover color
      },
    },
  },
  plugins: [],
}