// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'examples'), // serve examples folder
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      // optional: if you prefer to import from '@re-ark/src' in examples
      '@re-ark/src': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'examples', 'dist'),
  },
});
