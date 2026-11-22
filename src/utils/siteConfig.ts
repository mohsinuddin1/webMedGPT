/**
 * Site Configuration & Dynamic Domain Management
 *
 * Resolves the canonical base URL and domain dynamically from:
 * 1. PUBLIC_SITE_URL or SITE_URL environment variables (useful in CI/CD, Vercel preview/staging/production)
 * 2. import.meta.env.SITE (populated by Astro from astro.config.mjs)
 * 3. Default fallback: https://bloodtesthelp.com
 */

export const DEFAULT_SITE_URL = 'https://bloodtesthelp.com';
export const DEFAULT_DOMAIN = 'bloodtesthelp.com';
export const SITE_NAME = 'MedGPT';
export const SITE_EMAIL = 'contact@bloodtesthelp.com';

export function getSiteUrl(): string {
  const envUrl = 
    (typeof process !== 'undefined' && (process.env?.PUBLIC_SITE_URL || process.env?.SITE_URL)) ||
    (typeof import.meta !== 'undefined' && (import.meta.env?.PUBLIC_SITE_URL || import.meta.env?.SITE)) ||
    DEFAULT_SITE_URL;

  return envUrl.replace(/\/+$/, '');
}

export function getDomain(): string {
  try {
    return new URL(getSiteUrl()).hostname;
  } catch {
    return DEFAULT_DOMAIN;
  }
}
