import type { 
  AnalyticsConfig, 
  AnalyticsEvent, 
  GTagEventParams, 
  PageViewParams 
} from '../types';

/**
 * Analytics client class for managing Google Analytics
 */
export class Analytics {
  private config: AnalyticsConfig;
  private isInitialized = false;

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  /**
   * Check if analytics is available and enabled
   */
  private isAvailable(): boolean {
    return (
      typeof window !== 'undefined' &&
      !this.config.disabled &&
      typeof window.gtag === 'function'
    );
  }

  /**
   * Initialize Google Analytics
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    // Create gtag function if it doesn't exist
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
    }

    // Configure GA4
    window.gtag('config', this.config.measurementId, {
      page_path: window.location.pathname,
      debug_mode: this.config.debug,
    });

    this.isInitialized = true;

    if (this.config.debug) {
      console.log('[Analytics] Initialized with ID:', this.config.measurementId);
    }
  }

  /**
   * Track a page view
   */
  pageView(params?: PageViewParams): void {
    if (!this.isAvailable()) {
      if (this.config.debug) {
        console.log('[Analytics] Page view (disabled):', params);
      }
      return;
    }

    const pageParams: PageViewParams = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      ...params,
    };

    window.gtag?.('event', 'page_view', pageParams);

    if (this.config.debug) {
      console.log('[Analytics] Page view:', pageParams);
    }
  }

  /**
   * Track a custom event
   */
  trackEvent(event: AnalyticsEvent, params?: GTagEventParams): void {
    if (!this.isAvailable()) {
      if (this.config.debug) {
        console.log('[Analytics] Event (disabled):', event, params);
      }
      return;
    }

    window.gtag?.('event', event, params);

    if (this.config.debug) {
      console.log('[Analytics] Event:', event, params);
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, string | number | boolean>): void {
    if (!this.isAvailable()) {
      if (this.config.debug) {
        console.log('[Analytics] User properties (disabled):', properties);
      }
      return;
    }

    window.gtag?.('set', 'user_properties', properties);

    if (this.config.debug) {
      console.log('[Analytics] User properties:', properties);
    }
  }

  /**
   * Get the measurement ID
   */
  getMeasurementId(): string {
    return this.config.measurementId;
  }

  /**
   * Check if debug mode is enabled
   */
  isDebugMode(): boolean {
    return this.config.debug ?? false;
  }
}

/**
 * Singleton instance
 */
let analyticsInstance: Analytics | null = null;

/**
 * Initialize analytics with configuration
 */
export function initAnalytics(config: AnalyticsConfig): Analytics {
  if (!analyticsInstance) {
    analyticsInstance = new Analytics(config);
    analyticsInstance.initialize();
  }
  return analyticsInstance;
}

/**
 * Get the analytics instance
 */
export function getAnalytics(): Analytics | null {
  return analyticsInstance;
}

/**
 * Track a page view (convenience function)
 */
export function pageView(params?: PageViewParams): void {
  analyticsInstance?.pageView(params);
}

/**
 * Track an event (convenience function)
 */
export function trackEvent(event: AnalyticsEvent, params?: GTagEventParams): void {
  analyticsInstance?.trackEvent(event, params);
}

/**
 * Set user properties (convenience function)
 */
export function setUserProperties(properties: Record<string, string | number | boolean>): void {
  analyticsInstance?.setUserProperties(properties);
}
