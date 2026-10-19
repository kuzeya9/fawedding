import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  server: {
    host: true,
    port: 5173
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        admin: path.resolve(__dirname, 'admin.html')
      }
    }
  },
  plugins: [
    {
      name: 'fawedding-router',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0];

          // If accessing /admin or /admin/
          if (url === '/admin' || url === '/admin/') {
            req.url = '/admin.html';
            return next();
          }

          const staticExtRegex = /\.(html|js|css|png|jpe?g|gif|svg|ico|webp|mp3|wav|ogg|woff2?|ttf|eot|json|map)$/i;

          // If accessing a path like /Budi%20Santoso or /Prof.%20Dr.%20Bambang without a file extension
          if (
            url !== '/' &&
            !staticExtRegex.test(url) &&
            !url.startsWith('/assets') &&
            !url.startsWith('/@') &&
            !url.startsWith('/node_modules')
          ) {
            // Rewrite to index.html so client-side router/script can extract guest name from pathname
            req.url = '/index.html' + (req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '');
          }

          next();
        });
      },
      closeBundle() {
        // Ensure static assets (js, images) and img folder are copied into dist
        const distAssetsJs = path.resolve(__dirname, 'dist/assets/js');
        const srcAssetsJs = path.resolve(__dirname, 'assets/js');
        copyDirRecursive(srcAssetsJs, distAssetsJs);

        const distAssetsImages = path.resolve(__dirname, 'dist/assets/images');
        const srcAssetsImages = path.resolve(__dirname, 'assets/images');
        copyDirRecursive(srcAssetsImages, distAssetsImages);

        const distImg = path.resolve(__dirname, 'dist/img');
        const srcImg = path.resolve(__dirname, 'img');
        copyDirRecursive(srcImg, distImg);
      }
    }
  ]
});
