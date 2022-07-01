/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./forms/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-10": "rgba(255, 255, 255, 0.1)",
        "white-20": "rgba(255, 255, 255, 0.2)",
        "white-30": "rgba(255, 255, 255, 0.3)",
        "white-40": "rgba(255, 255, 255, 0.4)",
        "white-50": "rgba(255, 255, 255, 0.5)",
        "white-60": "rgba(255, 255, 255, 0.6)",
        "white-70": "rgba(255, 255, 255, 0.7)",
        "white-80": "rgba(255, 255, 255, 0.8)",
        "white-90": "rgba(255, 255, 255, 0.9)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
