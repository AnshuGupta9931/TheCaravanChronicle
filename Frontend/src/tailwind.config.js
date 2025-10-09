/** @type {import('tailwindcss').Config} */
module.exports = {
  // 💥 THE FIX IS HERE 💥
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        'circus-red': '#dc3545',
        'circus-gold': '#ffc107',
        'circus-dark': '#212529',
        'circus-light': '#f8f9fa', // This is now guaranteed to be generated
        'status-success': '#28a745',
        'status-progress': '#fd7e14',
        'status-resolved': '#17a2b8',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Bangers', 'cursive'], 
      },
      backgroundImage: {
        'circus-pattern': "repeating-linear-gradient(-45deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.1) 10px, transparent 10px, transparent 20px), repeating-linear-gradient(45deg, rgba(220, 53, 69, 0.05), rgba(220, 53, 69, 0.05) 10px, transparent 10px, transparent 20px)",
      }
    },
  },
  plugins: [],
}