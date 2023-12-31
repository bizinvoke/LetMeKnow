import react from '@vitejs/plugin-react';
import childProcess from 'child_process';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

const commitHash = childProcess
  .execSync('git rev-parse --short HEAD', {
    encoding: 'utf8',
  })
  .toString()
  .trim();

export default defineConfig({
  plugins: [
    react(),
    svgr({ include: '**/*.svg?react' }),
    VitePWA({
      base: '/LetMeKnow/',
      registerType: 'autoUpdate',
      manifest: {
        name: 'LetMeKnow',
        short_name: 'LetMeKnow',
        start_url: '/LetMeKnow/',
        display: 'standalone',
        background_color: '#0175C2',
        theme_color: '#0175C2',
        description: 'LetMeKnow.',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/Icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/Icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/Icon-maskable-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icons/Icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      outDir: 'docs',
      buildBase: '/LetMeKnow/',
      workbox: {
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
        ignoreURLParametersMatching: [/.*/],
        // globIgnores:[],
        maximumFileSizeToCacheInBytes: 50000000,
      },
      devOptions: { enabled: true },
    }),
  ],
  build: { outDir: 'docs' },
  base: '/LetMeKnow/',
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
