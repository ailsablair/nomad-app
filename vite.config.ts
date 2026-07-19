import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/nomad/',
  root: './client', // Vite now looks inside 'client' for index.html
  build: {
    outDir: '../dist', // Build output will still be in the root 'dist'
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  }
});
