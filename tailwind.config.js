/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        loginbg: "#e8e8e8",
        navbg: "#2b2b2b",
        navtext: "gray",
      },
      fontFamily: {
        title: ["Afacad Flux", "sans-serif"],
        uniform: ["Roboto Condensed", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        flux: ["Afacad Flux", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
