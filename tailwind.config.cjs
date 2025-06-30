/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app-base/adminizer/modules/**/*.{ts,tsx}',
    './app-base/adminizer/components/ui/**/*.{ts,tsx}',
    './docs/**/*.{md,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
