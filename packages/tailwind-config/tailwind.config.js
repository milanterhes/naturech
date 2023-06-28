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
      backdropFilter: {
        // creates a new utility for backdrop filter
        none: "none",
        blur: "blur(10px)",
      },
      colors: {
        "main-theme": "#DDA771",
      },
      dropShadow: {
        highlight: "0px 0px 20px rgba(255,255,255,0.60)",
        "highlight-dark": "0px 7px 2px rgba(0,0,0,0.80)",
      },
    },
  },
  variants: {
    extend: {
      backdropFilter: ["responsive"],
    },
  },
  plugins: [require("daisyui")],
};
