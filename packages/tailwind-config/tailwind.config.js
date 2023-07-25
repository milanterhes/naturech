/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: (theme) => ({
        "gradient-opacity":
          "linear-gradient(to bottom right, rgba(255, 255, 255, 0.6), rgba(231, 177, 129, 0.3))",
      }),
      fontFamily: {
        bowlby: ["var(--font-bowlby)"],
        "roboto-mono": ["var(--font-roboto-mono)"],
        tangerine: ["var(--font-tangerine)"],
      },
      backdropFilter: {
        // creates a new utility for backdrop filter
        none: "none",
        blur: "blur(10px)",
      },
      colors: {
        "main-theme": "#DDA771",
        "secondary-theme": "#9A592D",
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
