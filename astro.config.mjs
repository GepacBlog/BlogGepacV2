import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gepacblog.github.io',
  base: '/BlogGepacV2',
  trailingSlash: 'never',
  build: { format: 'directory' }
});
