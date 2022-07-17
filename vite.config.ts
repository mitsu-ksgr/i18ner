/**
 * vite.config.ts
 *
 * https://ja.vitejs.dev/config/
 */
import path from 'path';
import url from 'url';

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',
  plugins: [
    svelte({
      configFile: './svelte.config.js',
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(dirname, 'src'),
    },
  },
  define: {
    __APP_NAME__: JSON.stringify(process.env.npm_package_name),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __GITHUB_LINK__: JSON.stringify('https://github.com/mitsu-ksgr/i18ner'),
  },
});
