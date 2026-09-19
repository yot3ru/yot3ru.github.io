import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lufi.lk',
  output: 'static',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      target: 'es2020',
    },
  },
});
