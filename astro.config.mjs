// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const SITE_URL = process.env.PUBLIC_SITE_URL || process.env.SITE_URL || 'https://bloodtesthelp.com';
const siteClean = SITE_URL.replace(/\/+$/, '');
const siteWithSlash = `${siteClean}/`;

/**
 * Scan blog frontmatter once at config evaluation time so sitemap <lastmod>
 * reflects real article updatedDate/pubDate instead of build timestamp.
 */
function buildBlogLastmodMap() {
  const map = new Map();
  const latestByLocale = new Map();
  const blogRoot = path.resolve(process.cwd(), 'src/content/blog');
  if (!fs.existsSync(blogRoot)) return { map, latestByLocale };

  for (const langDir of fs.readdirSync(blogRoot)) {
    const fullLangDir = path.join(blogRoot, langDir);
    if (!fs.statSync(fullLangDir).isDirectory()) continue;
    const langLower = langDir.toLowerCase();

    for (const file of fs.readdirSync(fullLangDir)) {
      if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue;
      const slug = file.replace(/\.mdx?$/, '');
      const fullPath = path.join(fullLangDir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      let isoDate = null;
      if (fmMatch) {
        const upd = fmMatch[1].match(/^updatedDate:\s*["']?([^"'\r\n]+)/m);
        const pub = fmMatch[1].match(/^pubDate:\s*["']?([^"'\r\n]+)/m);
        const rawDate = (upd && upd[1]) || (pub && pub[1]);
        if (rawDate) {
          const parsed = new Date(rawDate.trim());
          if (!Number.isNaN(parsed.valueOf())) {
            isoDate = parsed.toISOString();
          }
        }
      }
      if (!isoDate) {
        isoDate = fs.statSync(fullPath).mtime.toISOString();
      }
      const routePath = langLower === 'en' ? `/blog/${slug}` : `/${langLower}/blog/${slug}`;
      map.set(routePath, isoDate);

      const prevLatest = latestByLocale.get(langLower);
      if (!prevLatest || isoDate > prevLatest) {
        latestByLocale.set(langLower, isoDate);
      }
    }
  }
  return { map, latestByLocale };
}

const { map: lastmodByPath, latestByLocale } = buildBlogLastmodMap();
const globalLatestIso = Array.from(latestByLocale.values()).sort().pop();

export default defineConfig({
  site: siteClean,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) => !page.replace(/\/+$/, '').endsWith('/download'),
      serialize(item) {
        const u = new URL(item.url);
        const p = u.pathname === '/' ? '/' : u.pathname.replace(/\/+$/, '');
        item.url = p === '/' ? siteWithSlash : `${siteClean}${p}`;

        if (p === '/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
          if (globalLatestIso) item.lastmod = globalLatestIso;
        } else if (/^\/blog\/[^/]+$/.test(p)) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
          const dt = lastmodByPath.get(p);
          if (dt) item.lastmod = dt;
        } else if (/^\/[a-z-]+\/blog\/[^/]+$/.test(p)) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
          const dt = lastmodByPath.get(p);
          if (dt) item.lastmod = dt;
        } else if (p === '/blog' || /^\/[a-z-]+\/blog$/.test(p)) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
          const loc = p === '/blog' ? 'en' : p.split('/')[1];
          const dt = latestByLocale.get(loc);
          if (dt) item.lastmod = dt;
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
          if (globalLatestIso) item.lastmod = globalLatestIso;
        }

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
    locales: ['en', 'fr', 'es', 'de', 'nl', 'pt', 'ro', 'it', 'sv', 'da', 'no', 'pl', 'cs', 'lt', 'lv', 'tr', 'bg', 'ru', 'el', 'ar', 'ar-MA', 'ja', 'ko', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
