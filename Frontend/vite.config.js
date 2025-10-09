// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 💥 REMOVE THIS LINE IF IT EXISTS: import tailwindcss from "@tailwindcss/vite"; 💥
import tailwindcssPostcss from '@tailwindcss/postcss'; // Use the PostCSS plugin
import autoprefixer from 'autoprefixer'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  css: {
    postcss: {
      plugins: [
        // Use the imported PostCSS package
        tailwindcssPostcss(), 
        autoprefixer(),
      ],
    },
  },
});