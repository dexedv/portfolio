// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  base: '',
  site: 'https://portfoliodexedv.site',
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsPrefix: '',
      relativePaths: true,
      cssMinify: true
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  },
  integrations: [react()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
