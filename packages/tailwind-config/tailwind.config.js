/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bowlby: ["var(--font-bowlby)"],
        "roboto-mono": ["var(--font-roboto-mono)"],
      },
      colors: {
        "main-theme": "#DDA771",
      },
      dropShadow: {
        highlight: "0px 0px 20px rgba(255,255,255,0.60)",
      },
    },
  },
  plugins: [require("daisyui")],
};
