# MedGPT Blog Creation Rules & Topic Index

This document defines the mandatory criteria for creating new blog posts on the MedGPT website and maintains a master index of all previously covered topics to prevent duplication.

---

## 1. Universal Blog Creation Criteria

### Frontmatter Requirements
Every blog post `.mdx` file **must** include the following YAML frontmatter fields, adhering to the Astro content collection schema:

```yaml
---
title: "<string>"             # SEO-optimized title
description: "<string>"       # 1-2 sentence meta description for search engines
pubDate: YYYY-MM-DD           # Publication date
updatedDate: YYYY-MM-DD       # (Optional) Last updated date
author: "MedGPT Team"         # Default author
image: "<url>"                # Unique Unsplash image URL (must differ from ALL previous blogs)
imageAlt: "<string>"          # Descriptive alt text for the hero image
tags: ["<string>", "<string>"] # Array of relevant tags
readingTime: "<number> min read" # Estimated reading time
featured: <boolean>           # true or false
---
```

### Content Structure (MDX Body)
All blog posts must follow this specific structural pattern to ensure consistency:

1. **Introductory Paragraph**: A clear, concise introduction summarizing the topic and the value the reader will get.
2. **Main Sections (`##`) & Subsections (`###`)**: Use hierarchical headings to break down complex medical topics.
3. **Structured Data Display**: Use Markdown tables for comparisons or structured data (e.g., drug interactions, test result ranges).
4. **Lists**: Use bullet points for symptoms, risk factors, or steps.
5. **Red Flags / Emergency Section**: A dedicated section highlighting when a user must seek immediate emergency medical help. Use blockquotes (`> **Important:**`) for critical warnings.
6. **Questions for the Doctor**: A list of essential questions the patient should ask their healthcare provider regarding the topic.
7. **App Promotion Section ("How MedGPT Helps...")**: A section explaining how the MedGPT app can assist with the topic, including a download call-to-action (CTA) pointing to the Google Play Store.
8. **Frequently Asked Questions**: Provide short, direct answers to common questions about the topic.
9. **Medical Disclaimer**: Every blog post **must** end with the following disclaimer:
   *This article is for informational and educational purposes only and is not a substitute for professional medical advice. Always consult with your pharmacist or healthcare provider before making changes to your medications or health routines.*

### Localization & Language Switcher Requirements
- Blogs should ideally be translated into multiple locales to support the **Language Switcher**.
- Translations must be culturally adapted and medically accurate for the target language.

### SEO Requirements
- Target specific, high-intent medical queries (e.g., "how to read a blood test", "medicine side effects").
- Use plain English to explain complex medical terms.

---

## 2. Master Topic Index

> **Rule**: Every new blog post MUST cover a topic that is **distinct** from all entries below. Check this index before selecting a topic.

### Blog 1 — Find Local Medical Labs Near Me
- **Tags**: Medical Labs, Health Tests, Local Healthcare
- **Image**: `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Finding diagnostic labs, types of lab tests, what to expect at a lab, understanding lab accreditation.

### Blog 2 — How to Read Blood Test Results
- **Tags**: Blood Tests, Lab Results, Health Tracking
- **Image**: `https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: CBC (Complete Blood Count), CMP (Comprehensive Metabolic Panel), understanding reference ranges, red and white blood cells, platelets, interpreting abnormal results.

### Blog 3 — Understanding Cholesterol and Lipid Panels
- **Tags**: Heart Health, Cholesterol, Lab Tests
- **Image**: `https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: LDL, HDL, Triglycerides, total cholesterol, cardiovascular risk factors, fasting requirements for lipid panels.

### Blog 4 — Understanding Medicine Side Effects
- **Tags**: Medication Safety, Drug Interactions, Health Guide
- **Image**: `https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Common vs serious side effects, drug-drug interactions, drug-food interactions (e.g. grapefruit), checking side effects, questions for your doctor.

### Blog 5 — Understanding Thyroid Test Results
- **Tags**: Thyroid Health, Lab Tests, Health Guide, Endocrinology
- **Image**: `https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: TSH, Free T3, Free T4, Hypothyroidism, Hyperthyroidism, thyroid antibodies, managing thyroid health.

### Blog 6 — Managing High Blood Pressure
- **Tags**: Heart Health, Hypertension, Chronic Care, Health Guide
- **Image**: `https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Systolic vs Diastolic blood pressure, hypertension categories, silent symptoms, hypertensive crisis, lifestyle and medication management.

### Blog 7 — Understanding Diabetes and Your A1C Levels
- **Tags**: Diabetes, Blood Sugar, Metabolic Health
- **Image**: `https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Hemoglobin A1C test, prediabetes vs diabetes ranges, insulin resistance, dietary impact on blood sugar, continuous glucose monitors (CGMs).

### Blog 8 — Recognizing and Treating Iron Deficiency Anemia
- **Tags**: Anemia, Iron Deficiency, Lab Tests, Nutrition
- **Image**: `https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Ferritin levels, CBC, hemoglobin, symptoms of anemia, iron absorption inhibitors (calcium, tea) and enhancers (Vitamin C), supplementation.

---

## 3. Checklist for Creating the Next Blog Post

Before generating a new blog post, verify:
- [ ] **Topic uniqueness**: The chosen topic does NOT overlap with any blog in the Topic Index above.
- [ ] **Content structure**: Follows the required sections (Intro, Headings, Tables/Lists, Red Flags, Promotion, FAQ, Disclaimer).
- [ ] **SEO keyword research**: Targets user-centric health queries.
- [ ] **File naming**: Format as `slug.mdx` (e.g., `managing-high-blood-pressure.mdx`).
- [ ] **Location**: Saved in `src/content/blog/`.
- [ ] **Update this file**: Add the new blog entry to the Topic Index above after successful generation.
