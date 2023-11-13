import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');
const commitHash = execSync('git rev-parse --short HEAD', {
  encoding: 'utf8',
}).trim();

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        sourcemap: true,
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
        ignoreURLParametersMatching: [/.*/],
        // globIgnores:[],
        maximumFileSizeToCacheInBytes: 50000000,
      },
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
    __APP_VERSION__: commitHash ?? '0',
  },
});
