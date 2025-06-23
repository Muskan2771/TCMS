import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'SmartPro 2024',
          short_name: 'SmartPro',
          description: 'SmartPro 2024 Frontend Application',
          theme_color: '#ffffff',
          icons: [
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
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      minify: isProduction ? 'esbuild' : false,
      sourcemap: !isProduction,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        input: {
          main: 'index.html',
          meta: 'public/meta.json',
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            if (id.includes('/src/components/')) {
              return 'components';
            }
            if (id.includes('/src/pages/')) {
              const pageName = id.split('/src/pages/')[1].split('/')[0];
              return `pages-${pageName}`;
            }
            if (id.includes('/src/utils/')) {
              return 'utils';
            }
            if (id.includes('/src/hooks/')) {
              return 'hooks';
            }
            if (id.includes('/src/services/')) {
              return 'services';
            }
            return 'common';
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/assets/[name]-[hash].[ext]',
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.REACT_APP_API_URI,
          changeOrigin: true,
          secure: true,
        },
      },
      hmr: { overlay: true },
    },
  };
});
