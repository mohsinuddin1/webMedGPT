// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://medgptai.droploop.in',
  output: 'static',
  integrations: [sitemap(), mdx()],
  image: {
    domains: [],
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'de', 'nl', 'pt', 'ro', 'it', 'sv', 'da', 'no', 'nb', 'pl', 'cs', 'lt', 'lv', 'tr', 'bg', 'ru', 'el', 'ar', 'ar-MA', 'ja', 'ko', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});