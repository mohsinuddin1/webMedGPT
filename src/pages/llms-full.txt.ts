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

  const articleBlocks = enPosts.map((post) => {
    const slug = post.id.replace('en/', '');
    const summary = post.data.shortAnswer || post.data.description;
    const sourcesText =
      post.data.sources && post.data.sources.length > 0
        ? ` | Sources: ${post.data.sources.map((s) => `[${s.name}](${s.url})`).join(', ')}`
        : '';
    return `- **[${post.data.title}](${siteUrl}/blog/${slug})**: ${summary}${sourcesText}`;
  });

  const body = `# MedGPT — Full Knowledge Base & Agent System Context

> MedGPT (${siteUrl}) is an AI-powered educational health platform and clinical health assistant designed to decode medical jargon, analyze blood test results, explain imaging reports, and provide medication safety information.

---

## 1. System Overview & Core Capabilities

MedGPT provides patient-friendly health literacy tools accessible via web and mobile:
- **Blood Report Analysis**: Instant interpretation of Complete Blood Count (CBC/FBC), Comprehensive Metabolic Panel (CMP), Liver Function Tests (LFT), Renal Function Tests (KFT), Lipid Panels, and Thyroid Function Tests (TFT).
- **Radiology Report Simplifier**: Translation of complex radiological impressions (chest X-rays, bone X-rays, brain MRIs, abdominal CT scans, ultrasounds) into clear, non-alarmist explanations.
- **Medication Intelligence**: Verification of prescription indications, adverse side effects, contraindications, and food-drug interactions.
- **Doctor Consultation Preparation**: Generating structured question checklists and actionable symptom timelines for clinical appointments.
- **Multilingual Support**: Fully localized in 24 languages with regional healthcare system workflows (US, UK NHS, Australia Medicare, Germany ePA/GKV, Poland NFZ, Czech VZP, Russia OMI/EGISZ, etc.).

---

## 2. Published Clinical Guides & Health Education Index (${enPosts.length} Guides)

All educational articles are grounded in peer-reviewed clinical guidelines, national health agencies (CDC, NIH, MedlinePlus, FDA, WHO), and certified laboratory medicine federations.

${articleBlocks.join('\n')}

---

## 3. Clinical Biomarker Standards & Unit Conversions

MedGPT standardizes both Conventional (US) and International System (SI) laboratory units:

| Biomarker | US Conventional Units | International SI Units | Conversion Formula |
|:---|:---|:---|:---|
| **Hemoglobin** | 12.0 – 17.5 g/dL | 120 – 175 g/L | 1 g/dL = 10 g/L |
| **Glucose** | 70 – 99 mg/dL | 3.9 – 5.5 mmol/L | mg/dL / 18 = mmol/L |
| **Creatinine** | 0.6 – 1.3 mg/dL | 53 – 115 µmol/L | mg/dL * 88.4 = µmol/L |
| **Total Cholesterol** | < 200 mg/dL | < 5.2 mmol/L | mg/dL * 0.02586 = mmol/L |
| **Triglycerides** | < 150 mg/dL | < 1.7 mmol/L | mg/dL * 0.01129 = mmol/L |
| **Enzymes (ALT/AST)** | 10 – 50 U/L | 0.17 – 0.83 µkat/L | 1 µkat/L ≈ 60 U/L |

---

## 4. Emergency Criteria & Triage Warnings

MedGPT prompts immediate emergency care (calling local emergency services such as 911 in the US/Canada, 112 in the EU, 999 in the UK, 155 in Czech Republic, 000 in Australia) whenever users report:
- Sudden severe chest pain or crushing thoracic pressure
- Signs of stroke: Face drooping, arm weakness, slurred speech (FAST criteria)
- Acute severe shortness of breath or sudden respiratory failure
- Sudden massive hemorrhage or vomiting blood
- Critical lab panic values (e.g., Platelets < 20 × 10⁹/L, Potassium > 6.5 mmol/L, Glucose < 50 mg/dL with altered mental status)

---

## 5. Machine-Readable Endpoints & Policies

- **Web Portal**: ${siteUrl}
- **Google Play**: https://play.google.com/store/apps/details?id=com.medgptai.app
- **App Store**: https://apps.apple.com/us/app/health-assistant-ai-wellness/id6837951020
- **XML Sitemap Index**: ${siteUrl}/sitemap-index.xml
- **RSS Feed**: ${siteUrl}/rss.xml
- **Agent Discovery (RFC 8288 / RFC 9727)**: ${siteUrl}/.well-known/ai-catalog.json
- **OpenAPI Schema**: ${siteUrl}/openapi.json
- **Privacy Policy**: ${siteUrl}/privacy
- **Terms of Service**: ${siteUrl}/terms
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
