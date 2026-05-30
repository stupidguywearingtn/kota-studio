/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque"', "sans-serif"],
        display: ['"Bricolage Grotesque"', "sans-serif"],
      },
      colors: {
        creme: "#FBF6EC",
        sable: "#F6EDDC",
        encre: "#241A12",
        "encre-soft": "#3A2C20",
        taupe: "#7a6c5a",
        or: "#C8A24E",
        "or-soft": "#E0C589",
      },
      letterSpacing: {
        title: "-0.03em",
      },
      boxShadow: {
        soft: "0 14px 40px -18px rgba(36,26,18,0.22)",
        "soft-lg": "0 30px 70px -28px rgba(36,26,18,0.30)",
        "soft-or": "0 24px 60px -22px rgba(200,162,78,0.45)",
      },
    },
  },
  plugins: [],
};
