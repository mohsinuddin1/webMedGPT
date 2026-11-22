import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const HOST = process.env.SITE_HOST || 'bloodtesthelp.com';
const KEY = 'd042f8c07df14d48aaf41adbaf6570b7';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_LOCAL = path.join(rootDir, 'dist', 'sitemap-0.xml');
const SITEMAP_URL = `https://${HOST}/sitemap-0.xml`;

const ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
];

async function verifyKeyIsLive() {
  console.log(`Checking if key is live at ${KEY_LOCATION}...`);
  try {
    const res = await fetch(KEY_LOCATION, { method: 'GET' });
    if (!res.ok) {
      console.warn(`⚠️ Key file returned HTTP ${res.status} ${res.statusText}.`);
      return false;
    }
    const text = (await res.text()).trim();
    if (text !== KEY) {
      console.warn(`⚠️ Key file content mismatch! Expected: ${KEY}, got: ${text}`);
      return false;
    }
    console.log(`✓ Key file verified live and matches API key.`);
    return true;
  } catch (err) {
    console.warn(`⚠️ Failed to verify key file online:`, err.message);
    return false;
  }
}

async function getUrlList() {
  let xmlContent = '';
  if (fs.existsSync(SITEMAP_LOCAL)) {
    console.log(`Reading URLs from local sitemap: ${SITEMAP_LOCAL}`);
    xmlContent = fs.readFileSync(SITEMAP_LOCAL, 'utf-8');
  } else {
    console.log(`Local sitemap not found. Fetching from ${SITEMAP_URL}...`);
    const res = await fetch(SITEMAP_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
    }
    xmlContent = await res.text();
  }

  const matches = xmlContent.match(/<loc>(.*?)<\/loc>/g) || [];
  const urls = matches.map((m) => m.replace(/<\/?loc>/g, '').trim());
  const uniqueUrls = [...new Set(urls)].filter((u) => u.startsWith(`https://${HOST}`));

  return uniqueUrls;
}

async function submitBatch(endpoint, urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  return {
    endpoint,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok || response.status === 202,
  };
}

async function main() {
  console.log('=== IndexNow Submission Script ===');
  console.log(`Host: ${HOST}`);
  console.log(`Key: ${KEY}`);
  console.log(`Key Location: ${KEY_LOCATION}`);

  const isLive = await verifyKeyIsLive();
  if (!isLive) {
    console.log('\nNOTE: The key file is not live on production yet.');
    console.log('Once your changes are deployed to Vercel/production, run this script again.\n');
  }

  const urls = await getUrlList();
  console.log(`Total unique URLs to submit: ${urls.length}`);

  if (urls.length === 0) {
    console.error('No URLs found to submit!');
    process.exit(1);
  }

  // IndexNow allows up to 10,000 URLs per request
  const BATCH_SIZE = 10000;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`\nSubmitting batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} URLs)...`);

    for (const endpoint of ENDPOINTS) {
      try {
        console.log(`Posting to ${endpoint}...`);
        const result = await submitBatch(endpoint, batch);
        console.log(`Response: ${result.status} ${result.statusText} (${result.ok ? 'SUCCESS' : 'FAILED'})`);
      } catch (err) {
        console.error(`Error submitting to ${endpoint}:`, err.message);
      }
    }
  }

  console.log('\n=== Submission Completed ===');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
