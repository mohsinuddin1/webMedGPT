import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAnalytics,
  initializeAnalytics,
  isSupported,
  logEvent,
  setConsent,
  type Analytics,
} from 'firebase/analytics';

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const firebaseConfig = {
  apiKey: import.meta.env.WEBMEDGPT_FIREBASE_API_KEY,
  authDomain: import.meta.env.WEBMEDGPT_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.WEBMEDGPT_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.WEBMEDGPT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.WEBMEDGPT_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.WEBMEDGPT_FIREBASE_APP_ID,
  measurementId: import.meta.env.WEBMEDGPT_FIREBASE_MEASUREMENT_ID,
};

type DeviceOS = 'ios' | 'android' | 'macos' | 'windows' | 'linux' | 'other';
type PageType = 'homepage' | 'blog_post' | 'blog_index' | 'docs' | 'legal' | 'other';
type StorePlatform = 'ios' | 'android';

const SCROLL_MILESTONES = [25, 50, 75, 90, 100] as const;

let analyticsInstance: Analytics | null = null;
let initialized = false;

function getDeviceOS(): DeviceOS {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/Macintosh|Mac OS/i.test(ua)) return 'macos';
  if (/Windows/i.test(ua)) return 'windows';
  if (/Linux/i.test(ua)) return 'linux';
  return 'other';
}

function getPageType(pathname: string): PageType {
  const clean = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (clean === '/') return 'homepage';
  if (/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?blog\/[^/]+$/i.test(clean)) return 'blog_post';
  if (/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?blog$/i.test(clean)) return 'blog_index';
  if (clean.startsWith('/docs')) return 'docs';
  if (clean === '/privacy' || clean === '/terms') return 'legal';
  return 'other';
}

function getPageLang(): string {
  return document.documentElement.lang || 'en';
}

function clarityEvent(name: string): void {
  if (typeof window.clarity === 'function') {
    window.clarity('event', name);
  }
}

function claritySet(key: string, value: string): void {
  if (typeof window.clarity === 'function') {
    window.clarity('set', key, value);
  }
}

function trackFirebaseEvent(eventName: string, params: Record<string, string | number | boolean>): void {
  if (!analyticsInstance) return;
  try {
    logEvent(analyticsInstance, eventName, params);
  } catch {
    // Ignore analytics transport failures in restricted browsers
  }
}

function resolveButtonLocation(el: Element): string {
  const explicit = el.closest('[data-track-location]')?.getAttribute('data-track-location');
  if (explicit) return explicit;
  if (el.closest('#site-header')) return 'header';
  if (el.closest('#site-footer')) return 'footer';
  if (el.closest('#mobile-sticky-bar')) return 'mobile_sticky_bar';
  if (el.closest('.blog-post__cta')) return 'blog_post_cta';
  if (el.closest('.prose')) return 'inline_blog_content';
  if (el.closest('#hero')) return 'hero';
  if (el.closest('#download')) return 'bottom_cta';
  return 'page_content';
}

function getElementText(el: Element): string {
  return (el.textContent || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 100);
}

function detectStoreTarget(anchor: HTMLAnchorElement): { platform: StorePlatform; store: string } | null {
  const href = anchor.getAttribute('href') || '';
  if (!href) return null;

  if (href.includes('apps.apple.com')) {
    return { platform: 'ios', store: 'app_store' };
  }
  if (href.includes('play.google.com')) {
    return { platform: 'android', store: 'google_play' };
  }

  try {
    const resolved = new URL(anchor.href, window.location.origin);
    if (resolved.pathname.replace(/\/+$/, '') === '/download') {
      const isAppleUA = /iPad|iPhone|iPod|Macintosh|Mac OS/i.test(navigator.userAgent || '');
      return { platform: isAppleUA ? 'ios' : 'android', store: 'smart_redirect' };
    }
  } catch {
    // Ignore malformed hrefs
  }

  return null;
}

function computeScrollPercent(): number {
  const scrollHeight = Math.max(document.documentElement.scrollHeight, 1);
  const raw = Math.round(((window.scrollY + window.innerHeight) / scrollHeight) * 100);
  return Math.min(100, Math.max(0, raw));
}

async function initFirebaseAnalytics(): Promise<void> {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
    return;
  }

  try {
    const supported = await isSupported();
    if (!supported) return;

    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    try {
      analyticsInstance = initializeAnalytics(app, {
        config: {
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          cookie_expires: 0,
        },
      });
    } catch {
      analyticsInstance = getAnalytics(app);
    }

    setConsent({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  } catch {
    // Ignore environments where IndexedDB/Analytics is blocked
  }
}

/**
 * Initialize cookieless Firebase Analytics and Microsoft Clarity tracking
 * for app downloads (iOS vs Android), button clicks, QR code hovers, and scroll depth.
 */
export async function initAnalytics(): Promise<void> {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  const pagePath = window.location.pathname;
  const pageLang = getPageLang();
  const pageType = getPageType(pagePath);
  const deviceOS = getDeviceOS();

  claritySet('page_lang', pageLang);
  claritySet('page_type', pageType);
  claritySet('device_os', deviceOS);

  await initFirebaseAnalytics();

  const pageStartTime = Date.now();
  const reachedMilestones = new Set<number>();
  const viewedQrKeys = new Set<string>();
  let maxScrollPercent = 0;
  let hasClickedDownload = false;
  let engagementSent = false;
  let scrollRafPending = false;

  const evaluateScroll = (): void => {
    scrollRafPending = false;
    const currentPercent = computeScrollPercent();
    if (currentPercent > maxScrollPercent) {
      maxScrollPercent = currentPercent;
    }

    for (const milestone of SCROLL_MILESTONES) {
      if (currentPercent >= milestone && !reachedMilestones.has(milestone)) {
        reachedMilestones.add(milestone);
        trackFirebaseEvent('scroll_depth', {
          percent_scrolled: milestone,
          page_path: pagePath,
          page_lang: pageLang,
          page_type: pageType,
        });
        clarityEvent(`scroll_${milestone}`);
        claritySet('max_scroll_depth', String(maxScrollPercent));
      }
    }
  };

  evaluateScroll();

  window.addEventListener(
    'scroll',
    () => {
      if (scrollRafPending) return;
      scrollRafPending = true;
      window.requestAnimationFrame(evaluateScroll);
    },
    { passive: true }
  );

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const interactive = target.closest('a, button, [role="button"], summary');
    if (!interactive) return;

    const buttonLocation = resolveButtonLocation(interactive);
    const buttonId = interactive.id || interactive.getAttribute('data-track-button') || '';
    const buttonText = getElementText(interactive);

    if (interactive instanceof HTMLAnchorElement) {
      const storeTarget = detectStoreTarget(interactive);
      if (storeTarget) {
        hasClickedDownload = true;
        const currentScroll = computeScrollPercent();
        if (currentScroll > maxScrollPercent) {
          maxScrollPercent = currentScroll;
        }

        trackFirebaseEvent('app_download_click', {
          platform: storeTarget.platform,
          store: storeTarget.store,
          button_id: buttonId,
          button_text: buttonText,
          button_location: buttonLocation,
          page_path: pagePath,
          page_lang: pageLang,
          page_type: pageType,
          device_os: deviceOS,
          scroll_percent_at_click: currentScroll,
          destination_url: interactive.href,
        });

        clarityEvent(`app_download_click_${storeTarget.platform}`);
        claritySet('download_platform', storeTarget.platform);
        claritySet('download_location', buttonLocation);
        return;
      }
    }

    const isTrackedButton = interactive.matches(
      'button, [role="button"], a.btn, header a, footer a, summary, [data-track-button]'
    );
    if (!isTrackedButton) return;

    const targetUrl = interactive instanceof HTMLAnchorElement ? interactive.href : '';
    const isFaqSummary = interactive.tagName.toLowerCase() === 'summary';

    trackFirebaseEvent('button_click', {
      button_id: buttonId,
      button_text: buttonText,
      button_location: buttonLocation,
      target_url: targetUrl,
      page_path: pagePath,
      page_lang: pageLang,
      page_type: pageType,
    });

    clarityEvent(isFaqSummary ? 'faq_toggle' : 'button_click');
  });

  document.querySelectorAll('.download-cta-wrapper').forEach((wrapper) => {
    wrapper.addEventListener('mouseenter', () => {
      const explicitPlatform = wrapper.getAttribute('data-track-platform');
      const anchor = wrapper.querySelector('a');
      const detected = anchor instanceof HTMLAnchorElement ? detectStoreTarget(anchor) : null;
      const platform =
        explicitPlatform === 'ios' || explicitPlatform === 'android'
          ? explicitPlatform
          : detected?.platform;

      if (!platform) return;

      const buttonLocation = resolveButtonLocation(wrapper);
      const key = `${platform}:${buttonLocation}`;
      if (viewedQrKeys.has(key)) return;
      viewedQrKeys.add(key);

      trackFirebaseEvent('qr_code_view', {
        platform,
        button_location: buttonLocation,
        page_path: pagePath,
        page_lang: pageLang,
        page_type: pageType,
      });
      clarityEvent(`qr_code_view_${platform}`);
    });
  });

  const sendEngagementSummary = (): void => {
    if (engagementSent) return;
    engagementSent = true;

    const currentScroll = computeScrollPercent();
    if (currentScroll > maxScrollPercent) {
      maxScrollPercent = currentScroll;
    }

    trackFirebaseEvent('page_engagement_summary', {
      max_scroll_percent: maxScrollPercent,
      time_on_page_sec: Math.round((Date.now() - pageStartTime) / 1000),
      clicked_download: hasClickedDownload,
      page_path: pagePath,
      page_lang: pageLang,
      page_type: pageType,
    });
    claritySet('max_scroll_depth', String(maxScrollPercent));
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendEngagementSummary();
    }
  });
  window.addEventListener('pagehide', sendEngagementSummary);
}
