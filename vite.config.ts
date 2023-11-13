import react from '@vitejs/plugin-react';
import childProcess from 'child_process';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const commitHash = childProcess
  .execSync('git rev-parse --short HEAD', {
    encoding: 'utf8',
  })
  .toString()
  .trim();

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // workbox: {
      //   sourcemap: true,
      //   globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
      //   ignoreURLParametersMatching: [/.*/],
      //   // globIgnores:[],
      //   maximumFileSizeToCacheInBytes: 50000000,
      // },
    }),
  ],
  build: { outDir: 'docs' },
  base: '/LetMeKnow',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __DIR_PAGES__: JSON.stringify(path.resolve(__dirname, './src/pages')),
    __DIR_SRC__: JSON.stringify(path.resolve(__dirname, './src')),
    __APP_VERSION__: JSON.stringify(commitHash),
  },
});
