// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://medgptai.droploop.in',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Normalize: strip trailing slash for all pages except the root domain
        if (item.url !== 'https://medgptai.droploop.in/' && item.url.endsWith('/')) {
          item.url = item.url.replace(/\/$/, '');
        }

        // Higher priority for homepage and English blog posts
        if (item.url === 'https://medgptai.droploop.in/' || item.url === 'https://medgptai.droploop.in') {
          item.url = 'https://medgptai.droploop.in/';
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.match(/\/blog\/[^/]+$/) && !item.url.match(/^\/(ar|fr|es|de|it|pt|nl|sv|da|no|nb|pl|cs|ro|lt|lv|bg|el|tr|ru|ja|ko|zh|ar-ma)\//)) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/blog')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        }
        // Always include lastmod
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
    mdx(),
  ],
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