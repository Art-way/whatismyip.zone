// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // هذا المسار هو كل ما نحتاجه للتأكد من أنه يمسح كل شيء داخل app
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {}, // نتركه فارغًا مؤقتًا للتركيز على المشكلة الأساسية
  },
  plugins: [
    require('@tailwindcss/typography'), // الإضافة التي نريدها أن تعمل
  ],
}