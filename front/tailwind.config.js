/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./error.vue",
    "presets/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
      },
    },
  },
  plugins: [],
};
