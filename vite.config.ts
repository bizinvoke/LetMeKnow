import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __DIR_PAGES__: JSON.stringify(path.resolve(__dirname, './src/pages')),
    __DIR_SRC__: JSON.stringify(path.resolve(__dirname, './src')),
  },
});
