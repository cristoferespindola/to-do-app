import { useEffect } from 'react';
import { getAnalytics } from '../lib/analytics';
import type { PageViewParams } from '../types';

/**
 * Hook to automatically track page views
 * @param enabled - Whether page view tracking is enabled
 * @param params - Optional page view parameters
 */
export function usePageView(enabled = true, params?: PageViewParams) {
  useEffect(() => {
    if (!enabled) return;

    const analytics = getAnalytics();

    if (analytics) {
      analytics.pageView(params);
    }
  }, [enabled, params]);
}
