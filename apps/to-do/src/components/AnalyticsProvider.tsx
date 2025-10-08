'use client';

import { useEffect, type ReactNode } from 'react';
import { initAnalytics } from '@to-do/analytics';

type AnalyticsProviderProps = {
  children: ReactNode;
  measurementId?: string;
  debug?: boolean;
}

/**
 * Provider component that initializes Google Analytics
 * Add this to your root layout to enable analytics throughout the app
 */
export function AnalyticsProvider({ 
  children, 
  measurementId,
  debug = false 
}: AnalyticsProviderProps) {
  useEffect(() => {
    if (measurementId) {
      initAnalytics({
        measurementId,
        debug,
        disabled: !measurementId,
      });
    }
  }, [measurementId, debug]);

  return <>{children}</>;
}
