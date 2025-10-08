import { useCallback } from 'react';
import { getAnalytics } from '../lib/analytics';
import type { AnalyticsEvent, GTagEventParams } from '../types';

/**
 * Hook to access analytics functionality
 */
export function useAnalytics() {
  const analytics = getAnalytics();

  const trackEvent = useCallback(
    (event: AnalyticsEvent, params?: GTagEventParams) => {
      analytics?.trackEvent(event, params);
    },
    [analytics]
  );

  const setUserProperties = useCallback(
    (properties: Record<string, string | number | boolean>) => {
      analytics?.setUserProperties(properties);
    },
    [analytics]
  );

  return {
    trackEvent,
    setUserProperties,
    isInitialized: analytics !== null,
  };
}
