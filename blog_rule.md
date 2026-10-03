# MedGPT Blog Creation Rules & Topic Index

This document defines the mandatory criteria for creating new blog posts on the MedGPT website, maintains the master index of published topics to prevent duplication, and connects to the upcoming topic roadmap defined in `idea_blog.md`.

All articles must achieve industry-leading excellence across the three pillars of modern digital visibility:
- **SEO (Search Engine Optimization)** — Traditional & Technical search engines (Google, Bing, Yahoo, Yandex, Baidu)
- **AEO (Answer Engine Optimization)** — Direct answers, voice search, and featured snippets (Perplexity, Google AI Overviews, SearchGPT, Siri, Google Assistant)
- **GEO (Generative Engine Optimization)** — AI reasoning engines, RAG retrieval pipelines, and LLM citations (ChatGPT, Claude, Gemini, Copilot, NotebookLM)

---

## 1. Universal Blog Creation Criteria

### Frontmatter Requirements
Every blog post `.mdx` file **must** include the following YAML frontmatter fields, adhering to the Astro content collection schema (`src/content.config.ts`) and powering Schema.org structured data, SEO meta tags, AEO snippet extraction, and GEO entity graphs:

```yaml
---
title: "<string>"                      # SEO: Target primary high-intent keyword near the front (50-60 characters)
description: "<string>"                # SEO/AEO: Compelling, click-worthy meta description with secondary keywords (140-160 characters)
pubDate: YYYY-MM-DD                    # SEO/E-E-A-T: Publication date (ISO format)
updatedDate: YYYY-MM-DD                # SEO/E-E-A-T: (Optional) Last clinically reviewed date
author: "MedGPT Editorial Team"        # SEO/E-E-A-T: Default: "MedGPT Editorial Team" or "MedGPT Team"
image: "<url>"                         # SEO: Unique, high-res Unsplash image (1200x630 ratio, must differ from ALL previous blogs)
imageAlt: "<string>"                   # SEO/Accessibility: Descriptive, keyword-rich alt text for image search
tags: ["<string>", "<string>"]          # SEO: 3-5 relevant thematic tags for internal taxonomy and related post matching
readingTime: "<number> min read"       # User Experience: Estimated reading time (e.g., "7 min read")
featured: <boolean>                    # Site Architecture: true or false (default: false)
shortAnswer: "<string>"                # AEO/Voice: 25-45 word direct, authoritative answer for Speakable schema & AI Overviews
about:                                 # GEO/Schema: Entity linking using "Type: Name" format for AI Knowledge Graphs
  - "MedicalCondition: <Condition>"
  - "MedicalTest: <Test Name>"
mentions:                              # GEO/Schema: Secondary entities discussed in the article
  - "Drug: <Medication Name>"
  - "MedicalTherapy: <Therapy Name>"
sources:                               # SEO/E-E-A-T & GEO: Evidence-based citations (rendered via <MedicalCitations />)
  - name: "<Authoritative Medical Organization, Journal, or Guideline>"
    url: "<https://authoritative-source.gov/...>"
    description: "<Optional brief description of clinical trial, range, or guideline>"
  - name: "<National Institutes of Health / MedlinePlus / CDC / WHO / Mayo Clinic>"
    url: "<https://...>"
---
```

---

### Content Structure (MDX Body)
All blog posts must follow this strict structural pattern to ensure clinical accuracy, patient readability, and seamless ingestion by both human readers and AI crawlers:

1. **Introductory Paragraph**: A clear, empathetic opening hook summarizing the topic, why it matters to the patient, and the core takeaway. Must include the primary keyword in the first 100 words.
2. **Speakable Direct Answer**: Fed by the frontmatter `shortAnswer` (rendered in `.blog-post__short-answer` and registered in `SpeakableSpecification` schema for voice assistants and AI answer cards).
3. **Main Sections (`##`) & Subsections (`###`)**: Strictly hierarchical headings. H2s and H3s should be framed as natural-language questions or search-intent queries (e.g., `## What Does High Creatinine Mean in a Blood Test?`).
4. **Structured Markdown Data Tables**: Markdown tables for reference ranges, biomarker interpretations, symptom comparisons, or drug interactions. Every table **must** specify clinical measurement units (`mg/dL`, `mmol/L`, `g/dL`, `mIU/L`). Markdown tables are critical for GEO/LLM parsing via HTTP Markdown content negotiation (`Accept: text/markdown`).
5. **Lists**: Bullet points or numbered lists for symptoms, risk factors, preparation steps, or common causes to capture Google Featured Snippets (list-type).
6. **Red Flags / Emergency Section**: A dedicated callout highlighting acute symptoms requiring immediate emergency medical care:
   ```markdown
   > **Emergency Red Flags:** Seek immediate emergency medical care (call 911 / 112 / your local emergency number) if you experience...
   ```
7. **Questions for Your Doctor**: A bulleted checklist of 4–6 actionable questions the patient should bring to their healthcare provider.
8. **App Promotion Section ("How MedGPT Helps...")**: A dedicated section demonstrating how MedGPT assists with this exact topic (e.g., report scanning, biomarker extraction, medication interaction checking), including a tracked Google Play CTA:
   ```markdown
   [Download MedGPT free on Google Play](https://play.google.com/store/apps/details?id=com.medgptai.app&utm_source=blog&utm_medium=<topic-slug>)
   ```
9. **Frequently Asked Questions (FAQ)**: 3–5 high-intent conversational FAQs with concise, direct answers. These power the `FAQPage` schema markup and browser WebMCP `get_medical_faq` queries.
10. **Medical Disclaimer**: Every blog post **must** conclude with the mandatory disclaimer:
    ```markdown
    ---

    *This article is for informational and educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding your symptoms, lab results, or medications.*
    ```

---

## 2. Universal Tri-Optimization Framework: SEO, AEO & GEO Excellence

Every MedGPT article must be optimized across all three dimensions simultaneously:

```
                  ┌─────────────────────────────────────────┐
                  │          MedGPT Blog Tri-Optimization    │
                  └────────────────────┬────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
   ┌───────────┐                 ┌───────────┐                 ┌───────────┐
   │    SEO    │                 │    AEO    │                 │    GEO    │
   │  Search   │                 │  Answer   │                 │Generative │
   │  Engines  │                 │  Engines  │                 │  Engines  │
   └─────┬─────┘                 └─────┬─────┘                 └─────┬─────┘
         │                             │                             │
  • High-Intent Keywords        • Direct `shortAnswer`        • Entity Graph (`about`)
  • Medical E-E-A-T             • `Speakable` Schema          • Structured Data Tables
  • Hreflang (25 Locales)       • Question-Based H2s/H3s      • Authoritative Citations
  • Schema.org JSON-LD          • Featured Snippet Lists      • Clean Markdown (RFC 8288)
  • Internal Links & Meta       • WebMCP FAQ Integration      • Agent Skill Alignment
```

---

### Part A: SEO Requirements (Search Engine Optimization)

Targeting Google, Bing, Yahoo, Yandex, and Baidu:

1. **Keyword Architecture & Placement**:
   - **Primary Keyword**: Must appear in the `title`, URL slug, H1, meta `description`, within the first 100 words of the body, and in at least one H2.
   - **Secondary & LSI Keywords**: Distribute long-tail variations, synonyms, and clinical vs lay terminology across H2s, H3s, and body paragraphs.
   - **Search Intent**: Focus on informational + high-conversion intent (e.g., `"how to read kidney function test results"`, `"eGFR low levels meaning"`, `"what does unremarkable mean on CT scan"`).

2. **On-Page & Technical SEO**:
   - **Title Tag**: 50–60 characters. Formatted as `Primary Keyword: Secondary Hook | MedGPT`.
   - **Meta Description**: 140–160 characters. Engaging summary including primary keyword, actionable value, and a CTA.
   - **Heading Hierarchy**: Strictly one single `<h1>` (generated from `title`), followed by logical `<h2>` sections and nested `<h3>` subsections. Never skip heading levels.
   - **Image Optimization**: Unique Unsplash URL per article. Must specify `imageAlt` with descriptive, accessible, keyword-rich text. Image dimensions standard 1200x630 (aspect ratio 21:9 in hero).
   - **Internal Linking**: Link to relevant related guides using natural anchor text. The layout automatically renders breadcrumbs and the `<SimilarBlogs />` component based on tags.

3. **Medical E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)**:
   - **Author Byline**: Set `author: "MedGPT Editorial Team"` (automatically tied to `Organization` and `reviewedBy` schema).
   - **Citation of Primary Sources (`sources`)**: Include 2–5 citations to gold-standard institutions (NIH, MedlinePlus, CDC, FDA, WHO, Mayo Clinic, Cleveland Clinic, NHS). Rendered visually in `<MedicalCitations />` and indexed by search bots.
   - **Prominent Medical Disclaimer**: Clear legal/medical boundaries build trust with Google's Quality Raters and YMYL (Your Money Your Life) algorithms.

4. **Schema.org Structured Data**:
   - Automatically injected by `SchemaMarkup.astro`:
     - `Article` (with headline, datePublished, dateModified, author, publisher, speakable, reviewedBy)
     - `MedicalWebPage` (with patient audience and medical subject tags)
     - `BreadcrumbList` (hierarchical site navigation)
     - `FAQPage` (structured question-answer rich results)
     - `Organization` & `SoftwareApplication` (author authority and app connection)

---

### Part B: AEO Requirements (Answer Engine Optimization)

Targeting Perplexity, Google AI Overviews (SGE), SearchGPT, Bing Copilot, and Voice Assistants (Siri, Alexa, Google Assistant):

1. **The Direct Answer Formula (`shortAnswer`)**:
   - Every article **must** provide a self-contained, fact-dense direct answer in the frontmatter `shortAnswer` field.
   - **Length**: 25–45 words (1–2 sentences).
   - **Structure**: Directly define or answer the core query without preamble. State the normal range, the common cause of elevation/abnormality, and the clinical implication.
   - *Example*: `"An eGFR of 60 or higher is in the normal range. An eGFR below 60 for three months or more may indicate kidney disease, while a score under 15 indicates kidney failure requiring immediate nephrology care."`
   - Rendered into `.blog-post__short-answer` with a distinctive accent callout at the top of the post.

2. **Speakable Specification Integration**:
   - The site embeds Schema.org `SpeakableSpecification` targeting:
     ```json
     "cssSelector": [".prose h1", ".prose h2", ".blog-post__short-answer", ".prose p:first-of-type"]
     ```
   - Voice assistants extract these exact CSS selectors when a user asks a spoken health question on a phone, smart speaker, or in-car assistant.

3. **Question-Based Headings (Query Matching)**:
   - Frame H2 and H3 headings as conversational, natural-language questions that real patients ask:
     - ❌ `## Creatinine Details`
     - ✅ `## What Does a High Creatinine Level Mean?`
     - ❌ `## Normal Ranges`
     - ✅ `## What Are the Normal Reference Ranges for a CBC?`

4. **Structured Lists for Google Featured Snippets**:
   - Use bullet points for symptoms and risk factors (targets bulleted list snippets).
   - Use numbered lists for sequential processes (e.g., preparation steps, how to collect a urine sample) to capture ordered list snippets.
   - Keep list items concise, starting each with a bold keyword (e.g., `- **Fasting:** Drink only water for 8–12 hours before...`).

5. **Standalone FAQ Units**:
   - The FAQ section must contain 3–5 distinct questions.
   - Each answer must be concise (2–3 sentences, 40–60 words) and completely understandable without reading the rest of the article.
   - Directly answers conversational long-tail queries and feeds WebMCP `get_medical_faq`.

---

### Part C: GEO Requirements (Generative Engine Optimization)

Targeting Large Language Models (ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Apple Intelligence, NotebookLM) and RAG (Retrieval-Augmented Generation) systems:

1. **Entity-Dense Knowledge Graph Alignment (`about` & `mentions`)**:
   - LLMs rely on named entity recognition (NER) to connect content to their internal knowledge graphs.
   - In frontmatter, declare explicit entities using the `Type: Name` format:
     ```yaml
     about:
       - "MedicalCondition: Chronic Kidney Disease"
       - "MedicalTest: Estimated Glomerular Filtration Rate"
     mentions:
       - "Drug: Lisinopril"
       - "MedicalTest: Blood Urea Nitrogen"
       - "AnatomicalStructure: Kidney"
     ```
   - Supported Schema Types: `MedicalCondition`, `MedicalTest`, `Drug`, `MedicalTherapy`, `AnatomicalStructure`, `MedicalSpecialty`.

2. **Quantitative Precision & Data Density**:
   - Generative models prioritize sources with verifiable numbers, statistics, and clinical cutoffs over vague summaries.
   - Always provide exact numbers:
     - ❌ *"eGFR can be low or high depending on your kidneys."*
     - ✅ *"An eGFR between 60–89 mL/min/1.73m² with kidney damage indicates Stage 2 CKD, while an eGFR < 15 indicates Stage 5 kidney failure."*
   - Always state both US conventional units (`mg/dL`, `g/dL`) and international SI units (`mmol/L`, `µmol/L`) where applicable.

3. **Structured Markdown Tables (Optimized for RAG & Markdown Negotiation)**:
   - MedGPT implements HTTP Markdown Content Negotiation (`Accept: text/markdown` and AI bot User-Agents like GPTBot, ClaudeBot, PerplexityBot).
   - When an AI agent fetches a blog post, it receives clean, raw Markdown.
   - LLMs parse Markdown tables with **95%+ retrieval accuracy** compared to unstructured paragraphs.
   - Every blog post covering tests, medications, or symptoms must feature at least one comprehensive Markdown table:
     ```markdown
     | Biomarker | Standard Reference Range | Elevated Levels May Indicate | Low Levels May Indicate |
     |:---|:---|:---|:---|
     | **eGFR** | > 90 mL/min/1.73m² | Normal kidney filtration | CKD, acute kidney injury |
     | **Creatinine** | 0.7–1.3 mg/dL (men)<br>0.6–1.1 mg/dL (women) | Kidney dysfunction, dehydration | Muscle loss, severe liver disease |
     | **BUN** | 7–20 mg/dL | High-protein diet, renal failure | Malnutrition, severe liver damage |
     ```

4. **Citation Fingerprinting & Grounding**:
   - AI search engines (like Perplexity and SearchGPT) require groundable citations to verify claims before generating an answer.
   - The frontmatter `sources` array gives the model trusted root URLs (`.gov`, `.edu`, `.org`), preventing hallucinations and directly triggering citations linking back to `medgptai.droploop.in`.

5. **MedGPT Agent Skills & Tool Parity**:
   - Align terminology and explanations with the site's published Agent Skills:
     - Blood/Lab tests ➔ [`blood-test-analysis`](file:///Users/mohsin/code/projects/webMedGPT/public/.well-known/agent-skills/blood-test-analysis/SKILL.md)
     - Drugs/Dosage/Interactions ➔ [`medication-information`](file:///Users/mohsin/code/projects/webMedGPT/public/.well-known/agent-skills/medication-information/SKILL.md)
     - Imaging/Terminology ➔ [`medical-jargon-simplifier`](file:///Users/mohsin/code/projects/webMedGPT/public/.well-known/agent-skills/medical-jargon-simplifier/SKILL.md)
   - Ensure the FAQs in the post match responses retrievable by the client-side WebMCP `search_health_topics` and `get_medical_faq` tools.

---

### Part D: International Localization & Multilingual SEO/AEO/GEO

Every blog **must** be translated into all 25 supported locales. Translations are **culturally adapted, locally contextualized** adaptations of the English source.

#### Supported Locales (25 languages)
`ar` · `ar-MA` · `bg` · `cs` · `da` · `de` · `el` · `en` · `es` · `fr` · `it` · `ja` · `ko` · `lt` · `lv` · `nb` · `nl` · `no` · `pl` · `pt` · `ro` · `ru` · `sv` · `tr` · `zh`

#### Mandatory Localization Rules

1. **Use local medical terminology, not literal translations.**
   - Example: A CBC is called *Blutbild* (🇩🇪), *morfologia krwi* (🇵🇱), *общий анализ крови* (🇷🇺), *пълна кръвна картина* (🇧🇬), *krevní obraz* (🇨🇿). Use the term patients actually see on their local lab reports.
2. **Reference the local healthcare system.**
   - 🇩🇪 Mention *Krankenkasse*, *ePA (elektronische Patientenakte)*, *Hausarzt*.
   - 🇦🇺 Reference *Medicare*, *My Health Record*, *bulk billing GP*.
   - 🇵🇱 Reference *NFZ*, *ZUS*, *skierowanie*.
   - 🇨🇿 Reference *VZP*, *pojišťovna*, *praktický lékař*.
   - 🇷🇺 Reference *ОМС*, *поликлиника*, *направление*.
   - 🇫🇷 Reference *Sécurité sociale*, *carte vitale*, *médecin traitant*.
   - 🇪🇸 Reference *Seguridad Social*, *tarjeta sanitaria*, *médico de cabecera*.
   - 🇮🇹 Reference *SSN (Servizio Sanitario Nazionale)*, *tessera sanitaria*, *medico di base*.
   - 🇳🇱 Reference *huisarts*, *zorgverzekering*, *eigen risico*.
   - 🇸🇪/🇳🇴/🇩🇰 Reference *vårdcentral/legevakt/lægevagt*, *personnummer*-based systems.
   - 🇹🇷 Reference *SGK*, *aile hekimi*, *e-Nabız*.
   - 🇯🇵 Reference *国民健康保険*, *かかりつけ医*.
   - 🇰🇷 Reference *국민건강보험*, *의원/병원*.
   - 🇷🇴 Reference *CNAS*, *medic de familie*.
   - 🇱🇹/🇱🇻 Reference *SODRA/VSAA*, *šeimos gydytojas/ģimenes ārsts*.
   - 🇧🇬 Reference *НЗОК*, *личен лекар*.
   - 🇬🇷 Reference *ΕΟΠΥΥ*, *οικογενειακός γιατρός*.
   - 🇵🇹 Reference *SNS (Serviço Nacional de Saúde)*, *médico de família*.
   - 🇸🇦/🇲🇦 (Arabic) Reference local health authority terminology relevant to the dialect.
   - 🇨🇳 (Chinese) Reference *医保*, *社区卫生服务中心*.
3. **Use local measurement units and lab report formats.**
   - Some countries use **mmol/L** (🇩🇪 🇫🇷 🇦🇺) vs **mg/dL** (🇺🇸). Reference ranges in tables **must** match what local patients actually see on their reports.
   - Use **comma as decimal separator** where locally standard (e.g., `1,3 mg/dL` in 🇩🇪 🇫🇷 🇵🇱 🇮🇹 🇪🇸).
4. **Adapt examples and scenarios to local context.**
   - Replace US-centric references (e.g., "call 911", "your PCP") with local equivalents (e.g., *112* in EU, *000* in 🇦🇺, *103* in 🇷🇺, *999* in 🇵🇱 ambulance).
   - Food/diet examples should reflect local cuisine, not just American foods.
5. **Localize the MedGPT CTA.**
   - The Google Play Store link remains the same, but the surrounding copy must be in the target language and mention that MedGPT works in that language.
6. **Medical disclaimer must be translated** into proper legal/medical phrasing for each locale — not a robotic translation of the English version.
7. **SEO: Use local-language keywords** in the translated `title`, `description`, and headings. Research what patients in that country actually type into Google (e.g., 🇩🇪 "Blutbild verstehen", 🇵🇱 "wyniki badań krwi", 🇷🇺 "расшифровка анализа крови").
8. **MANDATORY: Register all translated slugs in `src/utils/slugMap.ts`.**
   - Whenever a blog is translated into localized versions, add its English slug and all 24 localized slug mappings to `slugMap` in `src/utils/slugMap.ts`.
   - This powers bidirectional routing, language switcher navigation, and automatic `hreflang` alternate tag injection (`<link rel="alternate" hreflang="..." />`) for international SEO and agent discovery.

---

## 3. Master Topic Index

> **Rule**: Every new blog post MUST cover a topic that is **distinct** from all entries below. Check this index before selecting or generating a topic.

### Blog 1 — Find Local Medical Labs Near Me
- **Slug**: `find-local-medical-labs-near-me`
- **Tags**: Medical Labs, Health Tests, Local Healthcare
- **Image**: `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Finding diagnostic labs, types of lab tests, what to expect at a lab, understanding lab accreditation.

### Blog 2 — How to Read Blood Test Results
- **Slug**: `how-to-read-blood-test-results`
- **Tags**: Blood Tests, Lab Results, Health Tracking
- **Image**: `https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: CBC (Complete Blood Count), CMP (Comprehensive Metabolic Panel), understanding reference ranges, red and white blood cells, platelets, interpreting abnormal results.

### Blog 3 — Understanding Cholesterol and Lipid Panels
- **Slug**: `understanding-cholesterol-lipid-panel`
- **Tags**: Heart Health, Cholesterol, Lab Tests
- **Image**: `https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: LDL, HDL, Triglycerides, total cholesterol, cardiovascular risk factors, fasting requirements for lipid panels.

### Blog 4 — Understanding Medicine Side Effects
- **Slug**: `understanding-medicine-side-effects`
- **Tags**: Medication Safety, Drug Interactions, Health Guide
- **Image**: `https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Common vs serious side effects, drug-drug interactions, drug-food interactions (e.g. grapefruit), checking side effects, questions for your doctor.

### Blog 5 — Understanding Thyroid Test Results
- **Slug**: `understanding-thyroid-test-results`
- **Tags**: Thyroid Health, Lab Tests, Health Guide, Endocrinology
- **Image**: `https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: TSH, Free T3, Free T4, Hypothyroidism, Hyperthyroidism, thyroid antibodies, managing thyroid health.

### Blog 6 — Managing High Blood Pressure
- **Slug**: `managing-high-blood-pressure`
- **Tags**: Heart Health, Hypertension, Chronic Care, Health Guide
- **Image**: `https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Systolic vs Diastolic blood pressure, hypertension categories, silent symptoms, hypertensive crisis, lifestyle and medication management.

### Blog 7 — Understanding Diabetes and Your A1C Levels
- **Slug**: `understanding-diabetes-and-a1c`
- **Tags**: Diabetes, Blood Sugar, Metabolic Health
- **Image**: `https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Hemoglobin A1C test, prediabetes vs diabetes ranges, insulin resistance, dietary impact on blood sugar, continuous glucose monitors (CGMs).

### Blog 8 — Recognizing and Treating Iron Deficiency Anemia
- **Slug**: `recognizing-and-treating-iron-deficiency-anemia`
- **Tags**: Anemia, Iron Deficiency, Lab Tests, Nutrition
- **Image**: `https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Ferritin levels, CBC, hemoglobin, symptoms of anemia, iron absorption inhibitors (calcium, tea) and enhancers (Vitamin C), supplementation.

### Blog 9 — How to Read Your Kidney Function Test Results
- **Slug**: `how-to-read-kidney-function-test-results`
- **Tags**: Kidney Health, Lab Tests, Health Guide, Renal Function
- **Image**: `https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Serum creatinine, BUN (Blood Urea Nitrogen), BUN-to-creatinine ratio, eGFR (Estimated Glomerular Filtration Rate), CKD stages, urine albumin, cystatin C, kidney disease risk factors, practical result interpretation scenarios, kidney health protection.

### Blog 10 — Understanding Your Liver Function Test (LFT) Results
- **Slug**: `understanding-liver-function-test-results`
- **Tags**: Liver Health, Lab Tests, Hepatology, Health Guide
- **Image**: `https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: ALT (Alanine Transaminase), AST (Aspartate Transaminase), ALP (Alkaline Phosphatase), Bilirubin, Albumin, AST/ALT ratio, signs of fatty liver, liver enzyme interpretation, liver health protection.

### Blog 11 — What Your Urine Test (Urinalysis) Results Really Mean
- **Slug**: `understanding-urinalysis-urine-test-results`
- **Tags**: Urinalysis, Lab Tests, Kidney Health, Health Guide
- **Image**: `https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Leukocytes, nitrites, protein in urine, ketones, glucose, blood (hematuria), UTI indicators, kidney disease early warning signs, hydration, urine culture interpretation.

### Blog 12 — Vitamin D, B12, and Iron: How to Read Vitamin Deficiency Blood Tests
- **Slug**: `understanding-vitamin-deficiency-blood-test-results`
- **Tags**: Vitamin Deficiency, Lab Tests, Nutrition, Preventive Health
- **Image**: `https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Vitamin D (25-OH), Vitamin B12, Ferritin, Iron, TIBC, anemia symptoms, fatigue, bone health, lab normal ranges, MedGPT deficiency flagging.

### Blog 13 — Complete Blood Count (CBC) Differential: Understanding WBC Types
- **Slug**: `understanding-cbc-differential-wbc-types`
- **Tags**: Blood Tests, Immunology, Lab Tests, CBC, Health Guide
- **Image**: `https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils, bacterial vs viral infections, allergy markers, WBC differential, MedGPT auto-detection.

### Blog 14 — Understanding Electrolyte Panel Results: Sodium, Potassium, Calcium, Magnesium
- **Slug**: `understanding-electrolyte-panel-results`
- **Tags**: Electrolytes, Lab Tests, Metabolic Health, Health Guide
- **Image**: `https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Sodium, Potassium, Calcium, Magnesium, hydration, heart rhythm, muscle cramps, metabolic panel, electrolyte imbalance, MedGPT isolation.

### Blog 15 — How to Read Coagulation Test Results: PT, INR, and aPTT Explained
- **Slug**: `how-to-read-coagulation-test-results-pt-inr-aptt`
- **Tags**: Blood Clotting, Anticoagulants, Lab Tests, Health Guide
- **Image**: `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: PT (Prothrombin Time), INR (International Normalized Ratio), aPTT (Activated Partial Thromboplastin Time), extrinsic and intrinsic pathways, target INR ranges on warfarin/anticoagulants, high vs low INR risks, vitamin K food interactions, emergency bleeding vs clotting warning signs, MedGPT therapeutic range matching.

### Blog 16 — Hormone Blood Tests Explained: Estrogen, Testosterone, Cortisol, and Progesterone
- **Slug**: `hormone-blood-test-results-explained`
- **Tags**: Hormones, Endocrinology, Lab Tests, Women's Health, Men's Health
- **Image**: `https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Estradiol (E2) cycle phases and men's levels, Total vs Free Testosterone and SHBG, morning circadian Cortisol rhythm, Cushing's vs Addison's, Progesterone ovulation confirmation, 5 preparation rules (8 AM draw, fasting, cycle days, biotin washout), Addisonian crisis and pituitary apoplexy red flags, MedGPT hormone analysis.

### Blog 17 — What Does an Abnormal Blood Test Result Mean? When to Worry and When Not To
- **Slug**: `abnormal-blood-test-results-when-to-worry`
- **Tags**: Blood Tests, Health Anxiety, Lab Results, Primary Care, Patient Guide
- **Image**: `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: 95% bell curve Gaussian statistical rule (5% of healthy people naturally outside reference range, >64% chance of false flag on 25-test panel), 5 benign causes of abnormal labs (dehydration/hemoconcentration, intense workout/CK, recent viral infection, biotin assay interference, specimen hemolysis/pseudohyperkalemia), deviation categorization table (mild/borderline 1–15%, moderate 20–100%, critical panic values), doctor holistic review (isolated vs organ panel like Gilbert's syndrome, longitudinal trend, treating patient not paper), red flag emergency indicators (potassium >6.0 or <2.5, Hb <7.0, platelets <20k, glucose >400), 4-step action plan, doctor discussion questions, MedGPT AI interpretation.

### Blog 18 — Understanding Inflammatory Markers: CRP, ESR, and Ferritin in Your Blood Test
- **Slug**: `understanding-inflammatory-markers-crp-esr-ferritin`
- **Tags**: Inflammation, Lab Tests, Autoimmune, Health Guide
- **Image**: `https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Acute-phase reactants, C-Reactive Protein (CRP) rapid hepatic synthesis via IL-6 and magnitude thresholds (mild 3–10, moderate 10–50, marked 50–100, critical >100 mg/L), hs-CRP for cardiovascular plaque instability, Erythrocyte Sedimentation Rate (ESR / Westergren) mechanism via fibrinogen/rouleaux and non-inflammatory confounders (anemia, pregnancy, age), Westergren age formulas, Serum Ferritin dual role as iron storage and acute-phase protein, differentiating iron deficiency anemia vs anemia of chronic disease with TSAT, extreme hyperferritinemia (>1,000–10,000 ng/mL), 4 diagnostic combination patterns, emergency red flags (temporal arteritis / blindness risk, severe bacterial sepsis, HLH / cytokine storm), 4-step patient protocol, doctor questions, MedGPT AI lab analysis.

### Blog 19 — How to Read a Chest X-Ray Report: A Patient's Plain-English Guide
- **Slug**: `how-to-read-chest-x-ray-report`
- **Tags**: Chest X-Ray, Radiology, Imaging Reports, Health Guide
- **Image**: `https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: 5 anatomical sections of CXR reports (Indication, Technique, Comparison, Findings, Impression/Conclusion), decoding radiology jargon (Unremarkable / clear lungs, Opacity / Infiltrate, Consolidation / alveolar filling, Atelectasis / volume loss, Pleural Effusion / costophrenic blunting, Cardiomegaly / CTR > 0.50, Pneumothorax), PA vs. AP projection magnification physics (portable AP views falsely exaggerating cardiac silhouette), differentiating atelectasis vs consolidation vs bronchovascular markings, emergency red flags (tension pneumothorax with mediastinal shift, widened mediastinum / aortic dissection, acute massive pulmonary edema, pneumoperitoneum / free subdiaphragmatic air), 4-step patient review checklist, doctor discussion questions, MedGPT AI radiology translation.

### Blog 20 — Understanding Your Bone X-Ray Report: Fractures, Osteoporosis, and Joint Findings
- **Slug**: `bone-x-ray-report-explained`
- **Tags**: Bone X-Ray, Orthopedics, Radiology, Bone Health, Health Guide
- **Image**: `https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: 4 structural domains evaluated by radiologists (Alignment, Cortical Margins, Cartilage & Joint Space, Soft Tissues), decoding orthopedic radiology jargon (Intact cortices, Hairline / non-displaced fracture, Displaced / comminuted fracture, Joint space narrowing, Osteophytes / bone spurs, Subchondral sclerosis, Osteopenia / demineralization), the "Hidden Fracture" phenomenon and osteoclast bone resorption lag (10–14 days before visible fracture line or callus), Osteoarthritis (local joint wear, sclerosis, osteophytes) vs. Osteoporosis (systemic cortical thinning, radiolucency, DEXA T-score necessity), emergency red flags (open fracture, neurovascular compromise, unstable pelvic/spinal injury, complete dislocation, aggressive lytic bone destruction), 4-step patient review plan, orthopedic doctor discussion questions, MedGPT radiology AI translation.

### Blog 21 — What Does Your CT Scan Report Mean? A Patient's Guide to Common Findings
- **Slug**: `ct-scan-report-meaning-explained`
- **Tags**: CT Scan, Radiology, Medical Imaging, Health Guide
- **Image**: `https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: 5 core sections of CT reports (Indication, Technique/Protocol, Comparison, Organ-by-organ findings, Impression), Hounsfield Unit (HU) radiodensity scale explained (Hypodense cysts/fat vs. Isodense tissue vs. Hyperdense bone/acute blood vs. Contrast enhancement and wash-out), common benign findings decoding table (unremarkable, hypodense lesion, calcified granuloma, subcentimeter pulmonary nodule, reactive lymphadenopathy, hepatic steatosis, diverticulosis, vascular calcification), the "Incidentaloma" dilemma (30–50% of adult scans reveal asymptomatic benign findings like Bosniak I renal cysts, adrenal adenomas, hemangiomas), Contrast vs. Non-contrast CT trade-offs and hydration advice, emergency red flags (acute intracranial hemorrhage, pulmonary embolism, contrast blush active bleed, aortic dissection, pneumoperitoneum free air, bowel ischemia/pneumatosis), 4-step report review guide, doctor discussion questions, MedGPT AI CT interpretation.

### Blog 22 — Understanding Your MRI Report: What "Disc Bulge," "Signal Intensity," and "Lesion" Really Mean
- **Slug**: `mri-report-findings-explained`
- **Tags**: MRI, Radiology, Neurology, Spine Health, Health Guide
- **Image**: `https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: MRI physics without radiation (1.5T/3.0T magnetic fields & RF excitation of hydrogen protons), MRI sequence decoding (T1 structural/fat bright, T2 water/edema/inflammation bright, FLAIR CSF-suppressed brain edema/MS plaques, STIR fat-suppressed bone marrow edema/bone bruises), signal intensity terms (Hyperintense, Hypointense, Isointense), spine pathology spectrum (disc desiccation / "dark disc", disc bulge vs focal protrusion vs true extrusion / herniation, thecal sac abutment vs nerve root impingement, canal & foraminal stenosis, Modic type 1/2/3 endplate changes), brain MRI white matter lesions (microvascular aging vs MS Dawson fingers vs tumors), gadolinium contrast safety & indications (kidney eGFR considerations, distinguishing surgical scar from recurrent disc), emergency red flags (cauda equina syndrome, acute cervical myelopathy / myelomalacia, acute ischemic stroke on DWI/ADC, intracranial mass effect), 4-step report review plan, doctor discussion questions, MedGPT AI MRI interpretation.

### Blog 23 — Dental X-Ray Report: Understanding Cavities, Root Canal Findings, and Jaw Conditions
- **Slug**: `dental-x-ray-report-explained`
- **Tags**: Oral Health, Dental X-Ray, Root Canal, Periodontics, Health Guide
- **Image**: `https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Dental X-ray physics (Radiopacity white enamel/fillings/bone vs. Radiolucency dark pulp/caries/abscess/cysts), 4 major dental X-ray projections (Bitewing BWX for interproximal decay & crestal bone, Periapical PA for root apex & periapical lesions, Panoramic OPG for wisdom teeth & full jaw overview, CBCT 3D volumetric tomography for implant planning & nerve canal tracing), Caries depth classification (incipient enamel caries remineralizable with 5,000 ppm fluoride without drilling vs. dentinal caries requiring restorative filling), Endodontic root apex pathology (periapical radiolucency PARL from pulp necrosis, widened periodontal ligament PDL space, loss of lamina dura), Periodontal alveolar bone loss (horizontal bone loss vs. vertical angular defects vs. furcation involvement), Radiology report terminology glossary (incipient caries, PARL, overfill/underfill gutta-percha, impacted wisdom tooth, secondary recurrent caries, alveolar crest resorption), Radiation safety comparisons (4 bitewings ≈ 5 µSv vs. natural background 8 µSv/day vs. 2 bananas), Emergency red flags (Ludwig's angina submandibular woody swelling, canine space/orbital cellulitis, trismus < 15–20 mm, high fever), 4-step report review workflow, doctor discussion questions, MedGPT AI dental X-ray analysis.

### Blog 24 — How to Read an Ultrasound Report: Abdominal, Pelvic, and Thyroid Scans Explained
- **Slug**: `ultrasound-report-explained`
- **Tags**: Ultrasound, Sonography, Thyroid Nodules, Women's Health, Health Guide
- **Image**: `https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Ultrasound physics without ionizing radiation (2–18 MHz high-frequency sound waves & acoustic impedance), Echogenicity grayscale decoding (Anechoic jet-black fluid/cysts vs. Hypoechoic dark-gray solid masses/lymph nodes vs. Isoechoic medium-gray parenchyma vs. Hyperechoic bright-white stones/calcifications/fatty liver), Acoustic artifacts (Posterior acoustic shadowing behind calculi vs. Posterior acoustic enhancement behind fluid cysts), Color Doppler principles (BART: Blue Away, Red Towards transducer, not arterial vs. venous), 3 core scan deep dives: Abdominal (hepatic steatosis deep attenuation, hemangioma hyperechoic borders, gallstones, acute cholecystitis with wall thickening > 3 mm & positive sonographic Murphy's sign, common bile duct dilation, hydronephrosis, abdominal aortic aneurysm > 3.0 cm), Pelvic (endometrial stripe thickness norms pre/post-menopause, uterine fibroids whorled pattern, ovarian simple vs. endometrioma ground-glass vs. dermoid complex cysts, O-RADS risk classification), Thyroid & TI-RADS system (ACR TI-RADS TR1–TR5 scoring, suspicious features: marked hypoechogenicity, taller-than-wide shape, irregular/spiculated margins, microcalcifications, fine-needle aspiration FNA indications), Zero ionizing radiation safety (pregnancy and pediatric safe), Emergency red flags (acute cholecystitis with impacted stone & fever, ovarian/testicular torsion with absent Doppler flow, ruptured ectopic pregnancy with hemoperitoneum, obstructive infected hydronephrosis, leaking/rupturing AAA), 4-step report review workflow, doctor discussion questions, MedGPT AI ultrasound report analysis.

### Blog 25 — What Does "Unremarkable" Mean on a Radiology Report? Medical Report Terminology Decoded
- **Slug**: `radiology-report-unremarkable-meaning`
- **Tags**: Radiology, Medical Reports, Health Literacy, Medical Terminology
- **Image**: `https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: The paradox of the clinical term "unremarkable" (highest praise in medical imaging signifying normal, healthy tissue without pathological findings), Macroscopic vs. microscopic distinction in "grossly unremarkable" (normal on overall image resolution vs cellular histology), Lexicon decoding table (unremarkable, grossly unremarkable, within normal limits WNL, intact, patent, clear lungs, physiologic process, non-specific finding, incidentaloma/incidental findings, correlate clinically/cannot exclude), Why symptoms and pain persist despite unremarkable scans (neuropathic pain, small fiber neuropathy, early functional GI disorders like IBS/gastritis, muscle spasms/trigger points, metabolic/electrolyte imbalances), Emergency red flags (acute intracranial hemorrhage, midline shift, pneumoperitoneum free air under diaphragm, pulmonary embolism filling defect, active contrast extravasation blush, mesenteric ischemia/ileus), 4 targeted doctor follow-up questions, MedGPT AI report decoding.

### Blog 26 — How to Understand Medical Reports in Your Own Language: MedGPT's Multilingual Health Assistant
- **Slug**: `multilingual-medical-report-guide`
- **Tags**: Medical Translation, Health Literacy, Multilingual Health, Clinical AI, Medical Reports
- **Image**: `https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Dangers of generic machine translation tools (Google Translate, DeepL) in clinical reports (literal mistranslations of "grossly unremarkable", "lungs are clear", "unremarkable bowel gas pattern"), lab unit conversion traps (mmol/L vs. mg/dL for blood glucose, µmol/L vs. mg/dL for creatinine), regional medical abbreviations across languages (WNL, o.p.B., SP, WGN, VMN, DNT, BP, I.a., ΚΦ), privacy and security compliance risks (GDPR, HIPAA vs. public model data harvesting), comparative analysis (General Translator vs. MedGPT Clinical AI), 4-step report review workflow, emergency red flags requiring immediate care (troponin elevation, severe thrombocytopenia under 20,000/µL, acute intracranial hemorrhage/midline shift, pneumoperitoneum), doctor follow-up questions, 25-language clinical AI support.

### Blog 27 — Navigating the German Healthcare System: Understanding Your Blutbild and ePA
- **Slug**: `german-healthcare-blutbild-epa-guide`
- **Tags**: German Healthcare, Blutbild, ePA, Lab Tests, Health Literacy
- **Image**: `https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: German healthcare structure (Hausarzt gatekeeping, GKV statutory insurance vs. PKV private insurance, Überweisung specialist referrals, IGeL individual health services self-pay), elektronische Patientenakte (ePA für alle rollout under DigiG), Kleines Blutbild (basic hemogram: Ery, Hb, Hkt, MCV, MCH, MCHC, Thro, Leukos) vs. Großes Blutbild (adds differential leukogram: Neutrophile, Lymphozyten, Monozyten, Eosinophile, Basophile), decoding German lab sheet abbreviations (BSG, CRP, GOT/AST, GPT/ALT, gamma-GT, AP, Krea, eGFR, Harnstoff, Harnsäure, BZ, HbA1c, TSH basal, Quick-Wert/INR, o.b.B./o.p.B.), interpretation of `+`, `-`, and `*` flags on Laborbefunde, emergency red flags requiring immediate emergency room care (profound anemia Hb under 7.0 g/dL, severe thrombocytopenia under 20,000/µL, febrile neutropenia, severe hyperkalemia over 6.5 mmol/L, acute renal failure), 4 doctor follow-up questions in German, MedGPT 25-language AI report analysis.

### Blog 28 — Polish Healthcare Lab Guide: Badania Krwi, Morfologia, and NFZ
- **Slug**: `polish-healthcare-badania-krwi-guide`
- **Tags**: Polish Healthcare, Badania Krwi, Morfologia, NFZ, Health Literacy
- **Image**: `https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Polish healthcare structure (Lekarz POZ / Lekarz Rodzinny gatekeeping, NFZ statutory public insurance vs. private outpatient providers like Lux Med and Medicover, e-skierowanie electronic referrals), Internetowe Konto Pacjenta (IKP via pacjent.gov.pl central digital patient portal), commercial laboratory networks (Diagnostyka / diag.pl, ALAB laboratoria, Synevo self-pay punkt pobrań without referral), Morfologia krwi obwodowej breakdown (basic 3-part hemogram vs. morfologia z rozmazem automatycznym 5-diff: Erytrocyty RBC, HGB, HCT, MCV, MCH, MCHC, RDW, Płytki PLT, WBC, Neutrofile NEUT, Limfocyty LYMPH, Monocyty MONO, Eozynofile EOS, Bazofile BASO), decoding Polish lab report abbreviations (OB Odczyn Biernackiego / ESR, CRP Białko C-reaktywne, WGN w granicach normy, ALAT, ASPAT, GGTP, ALP/FA, Bilirubina, Kreatynina, eGFR, Mocznik, Kwas moczowy, Glukoza na czczo, HbA1c, TSH, Ferrytyna, INR/PT), interpretation of `H`, `L`, arrow, and bold/asterisk flags (95% bell curve statistical reality check), emergency red flags requiring immediate Szpitalny Oddział Ratunkowy (SOR / 112 / 999) evaluation (profound anemia Hb under 7.0 g/dL, severe thrombocytopenia PLT under 20,000/µL with petechiae wybroczyny, febrile neutropenia ANC under 500/µL, severe hyperkalemia potassium over 6.5 mmol/L, acute renal failure), 4 doctor follow-up questions in Polish, MedGPT 25-language AI report analysis.

---

## 4. Upcoming Topic Roadmap (`idea_blog.md`)

All future blog posts (Blog 29 through Blog 50) **must** be selected from the comprehensive research roadmap documented in `idea_blog.md`.

### Next Topics in Queue (Sequential Cluster C)
- **Blog 29** — Russian Healthcare Lab Guide: Расшифровка Анализа Крови (`russian-healthcare-blood-test-guide`)
- **Blog 30** — Czech Healthcare Lab Guide: Krevní Obraz, Žádanky, and VZP (`czech-healthcare-krevni-obraz-guide`)

### Topic Clusters Overview
Refer to `idea_blog.md` for complete keyword metrics, long-tail variants, target GEOs, and MedGPT feature mappings:
- **Cluster A (Blog 9–18)**: Blood & Lab Report Deep Dives *(Blogs 9–18 completed; Cluster A 100% complete)*
- **Cluster B (Blog 19–25)**: X-Ray & Imaging Reports *(Blogs 19–25 completed; Cluster B 100% complete)*
- **Cluster C (Blog 26–32)**: Multilingual & GEO-Targeted Health Systems (Multilingual Assistant, German ePA/Blutbild, Polish NFZ/Morfologia, Russian ОМС, Czech VZP, Bulgarian НЗОК, Australian My Health Record)
- **Cluster D (Blog 33–37)**: Medication, Drug Interactions & Safety (Drug-Food Interactions, Polypharmacy, Antibiotic Resistance, Supplements & Drugs, Missed Dose Guide)
- **Cluster E (Blog 38–44)**: Chronic Conditions & Preventive Health (CKD Stages, Fatty Liver/NAFLD, Allergy IgE Panels, Stool/Gut Tests, PSA/Prostate, STI Panels, Pregnancy Labs)
- **Cluster F (Blog 45–50)**: Digital Health, AI & Patient Empowerment (AI vs Google, Blood Test Prep/Fasting, Reference Ranges by Age, Health Insurance Coverage, Mental Health & Blood Markers, Beginner's Guide)

### Top Priority Queue from `idea_blog.md`
If producing high-conversion / high-volume posts out of sequential order, prioritize from the Top 10 list:
1. **Blog 17**: Abnormal Blood Test — When to Worry (10K–20K/mo, universal anxiety query)
2. **Blog 46**: How to Prepare for a Blood Test: Fasting, Hydration, and Timing Tips (10K–20K/mo, evergreen)
3. **Blog 25**: What Does "Unremarkable" Mean on a Radiology Report? (8K–15K/mo, high fear query)
4. **Blog 49**: Mental Health and Lab Tests: Blood Markers That Affect Anxiety and Mood (8K–15K/mo)
5. **Blog 29**: Russian Blood Test Guide: Расшифровка Анализа Крови (10K–20K/mo)
6. **Blog 43**: STI Testing: How to Read Your Sexual Health Lab Results (8K–15K/mo)
7. **Blog 44**: Pregnancy Blood Tests Explained: hCG, Blood Type, Glucose Tolerance (8K–12K/mo)
8. **Blog 19**: How to Read a Chest X-Ray Report: A Patient's Plain-English Guide (6K–10K/mo)
9. **Blog 33**: Common Drug-Food Interactions You Need to Know: Beyond Grapefruit (8K–12K/mo)

---

## 5. Agent Checklist for Creating the Next Blog Post

Before and during the generation of a new blog post, the agent **must** follow and verify this checklist:

- [ ] **1. Topic Selection & Uniqueness**:
  - Consult `idea_blog.md` to select the next topic (e.g., Blog 15 or top priority).
  - Verify that the topic does NOT duplicate any entry in Section 3 (Master Topic Index) above.
- [ ] **2. Frontmatter Complete & Tri-Optimized**:
  - **SEO Fields**: `title` (under 60 chars with primary keyword), `description` (140–160 chars), `pubDate`, `author`, `image` (unique Unsplash), `imageAlt` (descriptive), `tags` (3–5), `readingTime`, `featured`.
  - **AEO Fields**: `shortAnswer` (25–45 word standalone direct answer targeting voice/AI overviews).
  - **GEO Fields**: `about` (array of Schema.org `Type: Name` entities), `mentions` (secondary entities), and `sources` (array of 2–5 authoritative medical citations).
- [ ] **3. Body Structure & Multi-Engine Readability**:
  - Opening paragraph contains primary keyword in the first 100 words.
  - Headings (`##`, `###`) framed as conversational natural-language queries.
  - At least one structured Markdown table with standard clinical units (`mg/dL`, `mmol/L`).
  - Bulleted or numbered lists for symptoms/steps (Featured Snippet targets).
  - Emergency Red Flags blockquote (`> **Emergency Red Flags:** ...`).
  - Actionable Questions for the Doctor (4–6 items).
  - MedGPT app integration section with trackable Play Store link.
  - Standalone FAQ section (3–5 Q&As matching `FAQPage` & WebMCP format).
  - Mandatory Medical Disclaimer at the end.
- [ ] **4. File Location & Naming**:
  - Saved as `src/content/blog/en/<slug>.mdx`.
  - Slug matches the primary keyword in kebab-case.
- [ ] **5. Localization & SlugMap Registration (If translating)**:
  - When translating into the 24 other locales, strictly adhere to the 7 Mandatory Localization Rules.
  - Register the base English slug and all localized slugs in `src/utils/slugMap.ts`.
- [ ] **6. Build Verification**:
  - Run `npm run build` to ensure 0 build errors, valid frontmatter parsing, and proper route generation.
- [ ] **7. Update Topic Index**:
  - Add the new blog entry (number, title, slug, tags, image, topics covered) to Section 3 (Master Topic Index) in this file (`blog_rule.md`).
