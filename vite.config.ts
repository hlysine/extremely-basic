import million from 'million/compiler';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';
import { markdownIndex } from './scripts/markdownIndexPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    markdownIndex({
      entries: [
        {
          folderPath: 'src/content/conditions',
          output: 'src/routes/conditions/-list.gen.json',
        },
        {
          folderPath: 'src/content/drugs',
          output: 'src/routes/drugs/-list.gen.json',
        },
      ],
    }),
    million.vite({ auto: true, telemetry: false }),
    react(),
    tailwindcss(),
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', '*.svg', '*.png'],
      workbox: {
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
      },
      manifest: {
        name: 'Extremely Basic',
        short_name: 'Extremely Basic',
        description: 'Acute medicine quick reference',
        theme_color: '#414558',
        background_color: '#edeff7',
        orientation: 'portrait',
        display: 'fullscreen',
        display_override: ['fullscreen', 'standalone', 'minimal-ui'],
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
