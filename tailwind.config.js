export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#030303",
        },
        brand: {
          primary: "#6366f1",
        },
      },
      boxShadow: {
        premium: "0 10px 30px rgba(0,0,0,0.5)", // ✅ ADD THIS
      },
    },
  },
  plugins: [],
}