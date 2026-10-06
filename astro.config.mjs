import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL задаётся при сборке (Docker build-arg). Домен: philgodlewski.link
const site = process.env.SITE_URL || 'https://philgodlewski.link';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
