/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    // 注：jsx 不加 tailwindcss 不生效
    "./components/**/*.{jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

