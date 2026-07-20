import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: './client', // Tells Vite to look inside the client folder for index.html
  base: '/nomad/', 
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
  build: {
    outDir: '../dist', // Steps out of the client folder to place the build at the repo root
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
