import { useCallback } from 'react';
import { trackEvent as trackEventFn } from '../lib/analytics';
import type { AnalyticsEvent, GTagEventParams } from '../types';

/**
 * Hook to create a memoized event tracking function
 * @param event - The event name to track
 * @param baseParams - Base parameters to include with every event
 */
export function useTrackEvent(
  event: AnalyticsEvent,
  baseParams?: GTagEventParams
) {
  return useCallback(
    (additionalParams?: GTagEventParams) => {
      const params = { ...baseParams, ...additionalParams };
      trackEventFn(event, params);
    },
    [event, baseParams]
  );
}
