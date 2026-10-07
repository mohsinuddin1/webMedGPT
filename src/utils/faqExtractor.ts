/**
 * Extracts FAQ question and answer pairs from Markdown / MDX content.
 * Compatible with all 25 localized blog languages in MedGPT.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_HEADING_KEYWORDS = [
  'faq',
  'frequently asked',
  'questions',
  'sorulan',
  'preguntas',
  'domande',
  'fragen',
  'pytania',
  'întrebări',
  'klausimai',
  'jautājumi',
  'въпроси',
  'вопросы',
  'ερωτήσεις',
  'أسئلة',
  'الأسئلة',
  '常见问题',
  'よくある質問',
  '자주 묻는',
  'vanliga frågor',
  'ofte stillede',
  'veelgestelde',
  'časté otázky'
];

export function extractFaqsFromMarkdown(markdown?: string): FAQItem[] {
  if (!markdown) return [];

  const lines = markdown.split('\n');
  let inFaqSection = false;
  let currentQuestion: string | null = null;
  let currentAnswerLines: string[] = [];
  const faqs: FAQItem[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check for H2 heading
    if (/^##\s+/.test(rawLine)) {
      if (inFaqSection) {
        // Reached another H2 section after FAQ, flush and terminate
        if (currentQuestion && currentAnswerLines.length > 0) {
          const cleanAns = cleanAnswer(currentAnswerLines.join(' '));
          if (cleanAns) faqs.push({ question: currentQuestion, answer: cleanAns });
        }
        break;
      }

      const headingText = trimmed.replace(/^##\s+/, '').toLowerCase();
      if (FAQ_HEADING_KEYWORDS.some(k => headingText.includes(k))) {
        inFaqSection = true;
      }
      continue;
    }

    if (inFaqSection) {
      // Check for H3 question
      if (/^###\s+/.test(rawLine)) {
        if (currentQuestion && currentAnswerLines.length > 0) {
          const cleanAns = cleanAnswer(currentAnswerLines.join(' '));
          if (cleanAns) faqs.push({ question: currentQuestion, answer: cleanAns });
          currentAnswerLines = [];
        }
        currentQuestion = trimmed.replace(/^###\s+/, '').trim();
      } else if (currentQuestion) {
        // Stop if reaching medical disclaimer or divider
        if (
          trimmed.startsWith('---') ||
          trimmed.startsWith('*This article') ||
          trimmed.startsWith('_This article') ||
          trimmed.startsWith('*Bu makale') ||
          trimmed.startsWith('*Este artículo') ||
          trimmed.startsWith('*Ce document') ||
          trimmed.startsWith('*Questo articolo') ||
          trimmed.startsWith('*Disclaimer')
        ) {
          continue;
        }

        if (trimmed && !trimmed.startsWith('>')) {
          currentAnswerLines.push(trimmed);
        }
      }
    }
  }

  // Flush remaining question
  if (currentQuestion && currentAnswerLines.length > 0) {
    const cleanAns = cleanAnswer(currentAnswerLines.join(' '));
    if (cleanAns) faqs.push({ question: currentQuestion, answer: cleanAns });
  }

  return faqs;
}

function cleanAnswer(raw: string): string {
  return raw
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // remove markdown links, keep anchor text
    .replace(/[*_`#]/g, '')                   // remove formatting symbols
    .replace(/\s+/g, ' ')                     // normalize spaces
    .replace(/\s*\*This article.*$/i, '')     // strip trailing disclaimer if attached
    .trim();
}
