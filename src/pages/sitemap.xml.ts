import type { APIRoute } from 'astro';
import { getSiteUrl } from '../utils/siteConfig';

export const GET: APIRoute = async (context) => {
  const siteUrl = context.site ? (typeof context.site === 'string' ? context.site.replace(/\/+$/, '') : context.site.origin) : getSiteUrl();

  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-0.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(sitemapIndexXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
