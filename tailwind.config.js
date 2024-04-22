/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        subtitle: "Outfit",
        title: "Bebas Neue",
        about: "Work Sans",
        montserrat: "Montserrat",
      },
    },
  },
  plugins: [],
};
