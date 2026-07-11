// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import Analytics from '@vercel/analytics/astro';

export default defineConfig({
  site: 'https://medgptai.droploop.in',
  output: 'static',
  integrations: [sitemap(), mdx(), Analytics()],
  image: {
    domains: [],
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});