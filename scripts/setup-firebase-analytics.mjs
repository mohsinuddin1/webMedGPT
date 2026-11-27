#!/usr/bin/env node
/**
 * Idempotent GA4 / Firebase Analytics setup script for measurementId G-YCV442S5S1.
 * Creates the custom dimensions, custom metrics, and key events needed for
 * iOS vs Android download attribution, button clicks, QR hovers, and scroll depth.
 *
 * Uses only Node built-in modules (no extra npm packages required).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const TARGET_MEASUREMENT_ID = 'G-YCV442S5S1';
const ADMIN_API_BASE = 'https://analyticsadmin.googleapis.com/v1beta';
const OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const OAUTH_SCOPE = 'https://www.googleapis.com/auth/analytics.edit';

const CUSTOM_DIMENSIONS = [
  {
    parameterName: 'platform',
    displayName: 'Download Platform',
    description: 'Target app store OS (ios or android)',
  },
  {
    parameterName: 'store',
    displayName: 'App Store',
    description: 'Store destination (app_store, google_play, or smart_redirect)',
  },
  {
    parameterName: 'button_location',
    displayName: 'Button Location',
    description: 'UI placement of clicked CTA or button',
  },
  {
    parameterName: 'button_id',
    displayName: 'Button ID',
    description: 'DOM id or data-track-button identifier',
  },
  {
    parameterName: 'button_text',
    displayName: 'Button Text',
    description: 'Visible label or aria-label of the clicked element',
  },
  {
    parameterName: 'device_os',
    displayName: 'Device OS',
    description: 'Visitor OS detected from userAgent',
  },
  {
    parameterName: 'page_type',
    displayName: 'Page Type',
    description: 'Page category (homepage, blog_post, blog_index, docs, legal)',
  },
  {
    parameterName: 'page_lang',
    displayName: 'Page Language',
    description: 'Document locale (en, fr, pl, no, etc.)',
  },
];

const CUSTOM_METRICS = [
  {
    parameterName: 'percent_scrolled',
    displayName: 'Percent Scrolled',
    measurementUnit: 'STANDARD',
    description: 'Scroll depth milestone reached (25, 50, 75, 90, 100)',
  },
  {
    parameterName: 'max_scroll_percent',
    displayName: 'Max Scroll Percent',
    measurementUnit: 'STANDARD',
    description: 'Maximum scroll percentage reached on the page',
  },
  {
    parameterName: 'scroll_percent_at_click',
    displayName: 'Scroll at Download Click',
    measurementUnit: 'STANDARD',
    description: 'Scroll percentage at the moment a download button was clicked',
  },
  {
    parameterName: 'time_on_page_sec',
    displayName: 'Time on Page',
    measurementUnit: 'SECONDS',
    description: 'Elapsed seconds on the page before leaving or hiding tab',
  },
];

const KEY_EVENTS = [
  { eventName: 'app_download_click', countingMethod: 'ONCE_PER_EVENT' },
  { eventName: 'qr_code_view', countingMethod: 'ONCE_PER_EVENT' },
];

function resolveServiceAccountPath() {
  const args = process.argv.slice(2);
  const keyFlagIndex = args.indexOf('--key');
  if (keyFlagIndex !== -1 && args[keyFlagIndex + 1]) {
    return path.resolve(process.cwd(), args[keyFlagIndex + 1]);
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return path.resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS);
  }
  const rootFiles = fs.readdirSync(process.cwd());
  const match = rootFiles.find(
    (name) => name.includes('-firebase-adminsdk-') && name.endsWith('.json')
  );
  if (!match) {
    throw new Error(
      'Service account JSON not found. Pass --key <path> or set GOOGLE_APPLICATION_CREDENTIALS.'
    );
  }
  return path.resolve(process.cwd(), match);
}

function base64UrlEncode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, 'utf8');
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: OAUTH_SCOPE,
      aud: OAUTH_TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );

  const unsignedJwt = `${header}.${payload}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedJwt);
  const signature = base64UrlEncode(signer.sign(serviceAccount.private_key));
  const assertion = `${unsignedJwt}.${signature}`;

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  });

  const res = await fetch(OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`OAuth token exchange failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function apiRequest(accessToken, method, apiPath, body) {
  const url = `${ADMIN_API_BASE}${apiPath}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }

  if (!res.ok) {
    const err = new Error(
      `GA4 Admin API ${method} ${apiPath} failed (${res.status}): ${json?.error?.message || text}`
    );
    err.status = res.status;
    err.payload = json;
    throw err;
  }
  return json;
}

async function listPaginated(accessToken, apiPath, listKey) {
  const items = [];
  let pageToken = '';
  do {
    const sep = apiPath.includes('?') ? '&' : '?';
    const pagedPath = pageToken
      ? `${apiPath}${sep}pageSize=200&pageToken=${encodeURIComponent(pageToken)}`
      : `${apiPath}${sep}pageSize=200`;
    const res = await apiRequest(accessToken, 'GET', pagedPath);
    if (Array.isArray(res[listKey])) {
      items.push(...res[listKey]);
    }
    pageToken = res.nextPageToken || '';
  } while (pageToken);
  return items;
}

async function resolvePropertyName(accessToken) {
  if (process.env.GA4_PROPERTY_ID) {
    const raw = process.env.GA4_PROPERTY_ID.trim();
    return raw.startsWith('properties/') ? raw : `properties/${raw}`;
  }

  const summaries = await listPaginated(accessToken, '/accountSummaries', 'accountSummaries');
  const candidateProperties = [];
  for (const account of summaries) {
    for (const prop of account.propertySummaries || []) {
      candidateProperties.push({
        property: prop.property,
        displayName: prop.displayName,
        account: account.displayName,
      });
    }
  }

  if (candidateProperties.length === 0) {
    throw new Error(
      'No GA4 properties are accessible to this service account. ' +
        'Grant Editor access to the service account email under GA4 Admin -> Property access management.'
    );
  }

  for (const candidate of candidateProperties) {
    const streams = await listPaginated(
      accessToken,
      `/${candidate.property}/dataStreams`,
      'dataStreams'
    );
    const matchingStream = streams.find(
      (s) => s.webStreamData?.measurementId === TARGET_MEASUREMENT_ID
    );
    if (matchingStream) {
      console.log(
        `Matched ${TARGET_MEASUREMENT_ID} on ${candidate.property} (${candidate.displayName})`
      );
      return candidate.property;
    }
  }

  if (candidateProperties.length === 1) {
    const only = candidateProperties[0];
    console.log(
      `Using the only accessible GA4 property: ${only.property} (${only.displayName})`
    );
    return only.property;
  }

  throw new Error(
    `Could not find measurementId ${TARGET_MEASUREMENT_ID} among ${candidateProperties.length} accessible properties. ` +
      'Set GA4_PROPERTY_ID explicitly and re-run.'
  );
}

async function ensureCustomDimensions(accessToken, propertyName) {
  const existing = await listPaginated(
    accessToken,
    `/${propertyName}/customDimensions`,
    'customDimensions'
  );
  const existingParams = new Set(existing.map((d) => d.parameterName));

  const created = [];
  const skipped = [];

  for (const dim of CUSTOM_DIMENSIONS) {
    if (existingParams.has(dim.parameterName)) {
      skipped.push(dim.parameterName);
      continue;
    }
    await apiRequest(accessToken, 'POST', `/${propertyName}/customDimensions`, {
      parameterName: dim.parameterName,
      displayName: dim.displayName,
      description: dim.description,
      scope: 'EVENT',
    });
    created.push(dim.parameterName);
  }

  return { created, skipped };
}

async function ensureCustomMetrics(accessToken, propertyName) {
  const existing = await listPaginated(
    accessToken,
    `/${propertyName}/customMetrics`,
    'customMetrics'
  );
  const existingParams = new Set(existing.map((m) => m.parameterName));

  const created = [];
  const skipped = [];

  for (const metric of CUSTOM_METRICS) {
    if (existingParams.has(metric.parameterName)) {
      skipped.push(metric.parameterName);
      continue;
    }
    await apiRequest(accessToken, 'POST', `/${propertyName}/customMetrics`, {
      parameterName: metric.parameterName,
      displayName: metric.displayName,
      description: metric.description,
      measurementUnit: metric.measurementUnit,
      scope: 'EVENT',
    });
    created.push(metric.parameterName);
  }

  return { created, skipped };
}

async function ensureKeyEvents(accessToken, propertyName) {
  let resource = 'keyEvents';
  let listKey = 'keyEvents';
  let existing;

  try {
    existing = await listPaginated(accessToken, `/${propertyName}/${resource}`, listKey);
  } catch (err) {
    if (err.status === 404) {
      resource = 'conversionEvents';
      listKey = 'conversionEvents';
      existing = await listPaginated(accessToken, `/${propertyName}/${resource}`, listKey);
    } else {
      throw err;
    }
  }

  const existingEvents = new Set(existing.map((e) => e.eventName));
  const created = [];
  const skipped = [];

  for (const evt of KEY_EVENTS) {
    if (existingEvents.has(evt.eventName)) {
      skipped.push(evt.eventName);
      continue;
    }
    await apiRequest(accessToken, 'POST', `/${propertyName}/${resource}`, evt);
    created.push(evt.eventName);
  }

  return { resource, created, skipped };
}

async function main() {
  const keyPath = resolveServiceAccountPath();
  const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error(`Invalid service account key file: ${path.basename(keyPath)}`);
  }

  console.log(`Authenticating as ${serviceAccount.client_email}...`);
  const accessToken = await getAccessToken(serviceAccount);

  const propertyName = await resolvePropertyName(accessToken);

  const dimResult = await ensureCustomDimensions(accessToken, propertyName);
  const metricResult = await ensureCustomMetrics(accessToken, propertyName);
  const keyEventResult = await ensureKeyEvents(accessToken, propertyName);

  console.log('\n=== GA4 Setup Summary ===');
  console.log(`Property: ${propertyName}`);
  console.log(
    `Custom Dimensions -> created (${dimResult.created.length}): [${dimResult.created.join(', ')}], skipped (${dimResult.skipped.length}): [${dimResult.skipped.join(', ')}]`
  );
  console.log(
    `Custom Metrics    -> created (${metricResult.created.length}): [${metricResult.created.join(', ')}], skipped (${metricResult.skipped.length}): [${metricResult.skipped.join(', ')}]`
  );
  console.log(
    `Key Events (${keyEventResult.resource}) -> created (${keyEventResult.created.length}): [${keyEventResult.created.join(', ')}], skipped (${keyEventResult.skipped.length}): [${keyEventResult.skipped.join(', ')}]`
  );
}

main().catch((err) => {
  console.error('\nSetup failed:', err.message);
  if (err.status === 403) {
    console.error(
      '\nAction required:\n' +
        '1. Enable Google Analytics Admin API on project medgptbloodtest:\n' +
        '   https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com?project=medgptbloodtest\n' +
        '2. Grant Editor access to firebase-adminsdk-fbsvc@medgptbloodtest.iam.gserviceaccount.com\n' +
        '   under Google Analytics -> Admin -> Property -> Property access management.'
    );
  }
  process.exit(1);
});
