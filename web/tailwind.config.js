/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.html", "index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ae88cd",
          100: "#9d70c3",
          200: "#8d58b9",
          300: "#7d40af",
          400: "#6c28a5",
          500: "#5c109b",
          600: "#530e8c",
          700: "#4a0d7c",
          800: "#400b6d",
          900: "#370a5d",
          950: "#2e084e",
        },
      },
    },
  },
  plugins: [],
};
