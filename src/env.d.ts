/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly WEBMEDGPT_FIREBASE_API_KEY?: string;
  readonly WEBMEDGPT_FIREBASE_AUTH_DOMAIN?: string;
  readonly WEBMEDGPT_FIREBASE_PROJECT_ID?: string;
  readonly WEBMEDGPT_FIREBASE_STORAGE_BUCKET?: string;
  readonly WEBMEDGPT_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly WEBMEDGPT_FIREBASE_APP_ID?: string;
  readonly WEBMEDGPT_FIREBASE_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
