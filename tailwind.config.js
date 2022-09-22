/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        backImage: "url('/assets/background.png')",
        duoGradient: "linear-gradient(89.86deg, #9572FC 10.08%, #43E7AD 65.94%, #E1D55D 100%)",
        boxGradient: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    },
    screens: {
      'sm': '320px',

      'md': '520px',

      'lg': '768px',

      'xl': '1024px',

      '2xl': '1440px',
    }
  },
  plugins: [],
}
