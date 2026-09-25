import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL задаётся при сборке (Docker build-arg). Пока домена нет — плейсхолдер.
const site = process.env.SITE_URL || 'https://philgodlewski.com';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
