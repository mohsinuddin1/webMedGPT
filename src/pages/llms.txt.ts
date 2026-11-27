import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getSiteUrl } from '../utils/siteConfig';

export const GET: APIRoute = async (context) => {
  const siteUrl = context.site
    ? (typeof context.site === 'string' ? context.site.replace(/\/+$/, '') : context.site.origin)
    : getSiteUrl();

  const allPosts = await getCollection('blog');
  const enPosts = allPosts
    .filter((p) => p.id.startsWith('en/'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const guideLines = enPosts.map((post) => {
    const slug = post.id.replace('en/', '');
    return `- [${post.data.title}](${siteUrl}/blog/${slug}): ${post.data.description}`;
  });

  const body = `# MedGPT

> MedGPT is an AI-powered educational health companion that helps patients decode and understand complex medical reports, complete blood count (CBC) panels, radiology findings, and prescription side effects.

## Main Product & Platform

- [MedGPT Web Application](${siteUrl}): Official web portal and educational health assistant.
- [Google Play Application](https://play.google.com/store/apps/details?id=com.medgptai.app): Android native mobile app for scanning and explaining medical records.
- [App Store Application](https://apps.apple.com/us/app/health-assistant-ai-wellness/id6837951020): iOS native mobile app for scanning and explaining medical records.

## Core Clinical Capabilities

- **Blood Test Analysis**: Automated breakdown of CBC, metabolic panels, liver function tests (ALT, AST, ALP), kidney panels (eGFR, Creatinine, BUN), and lipid panels.
- **Radiology Report Interpretation**: Decoding medical terminology across X-rays, CT scans, MRIs, and ultrasounds.
- **Medication & Drug Safety**: Understanding prescription indications, side effects, contraindications, and food-drug interactions.
- **Multilingual Support**: Real-time localization across 24 languages with regional healthcare system integration (e.g., German ePA, Polish NFZ, Russian OMI, Czech VZP, Australian Medicare).

## Key Health Education Guides (${enPosts.length} Guides)

- [Health Blog Index](${siteUrl}/blog): Complete library of evidence-based patient guides.
${guideLines.join('\n')}

## Important Policies & Ethics

- [Privacy Policy](${siteUrl}/privacy): Encrypted temporary processing, zero third-party AI training, and immediate user deletion.
- [Terms of Service](${siteUrl}/terms): User agreement and educational boundaries.

## Machine-Readable Discovery

- [Full LLM Knowledge Graph](${siteUrl}/llms-full.txt): Extended biomarker tables, emergency triage thresholds, and full article citations.
- [XML Sitemap Index](${siteUrl}/sitemap-index.xml): Complete multilingual URL index across 24 languages.
- [RSS Feed](${siteUrl}/rss.xml): Latest English medical education guides.
- [API Documentation](${siteUrl}/docs/api): OpenAPI 3.1, MCP Server Card, and RFC 9727 catalog.

## Medical Disclaimer

MedGPT is an educational tool designed to improve health literacy and prepare patients for doctor visits. It does not provide medical diagnosis, clinical prognosis, or direct treatment advice. Always consult a licensed healthcare professional for medical emergencies and clinical evaluations.
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
