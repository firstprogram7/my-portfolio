module.exports = {
  darkMode: "class",
  content: [
    "./backend/views/**/*.ejs",   // <--- ADD THIS
    "./backend/public/**/*.js",   // <--- ADD THIS (if you use JS in /public)
    "./*.{html,js}",     // optional, keep this if needed
    "./backend/public/pages/**/*.{html,js}"
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px"
      },
      colors: {
        textColorDark:"#303030",
        textColorLight:"#696969",
        textOffWhite: "#f0efec",
        darkBackground:"#252525",
      }
    },
  },
  plugins: [],
};
