import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blog.gepac.es',
  trailingSlash: 'never',
  build: { format: 'directory' }
});
