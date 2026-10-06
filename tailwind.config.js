/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', "system-ui", "sans-serif"],
        display: ['"Unbounded"', '"Arial Black"', "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        hand: ['"Caveat"', "cursive"],
      },
      colors: {
        creme: "#F1F0EA",
        sable: "#E3E1D8",
        encre: "#141714",
        "encre-soft": "#163629",
        taupe: "#535A54",
        or: "#1F6B50",
        "or-soft": "#F1E25A",
        mat: "#1D4537",
        mat2: "#163629",
        grid: "#285A48",
        grid2: "#3A7A62",
        hi: "#F1E25A",
        hot: "#FF6A3D",
        onmat: "#EEF2EC",
        onmat2: "#A9BFB4",
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
