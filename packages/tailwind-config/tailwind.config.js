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
      },
      colors: {
        "main-theme": "#E7B181",
      },
    },
  },
  plugins: [require("daisyui")],
};
