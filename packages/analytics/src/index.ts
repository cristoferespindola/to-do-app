
export { 
  Analytics,
  initAnalytics, 
  getAnalytics,
  pageView,
  trackEvent,
  setUserProperties
} from './lib/analytics';

export { useAnalytics } from './hooks/useAnalytics';
export { usePageView } from './hooks/usePageView';
export { useTrackEvent } from './hooks/useTrackEvent';

export type {
  AnalyticsConfig,
  AnalyticsEvent,
  GTagEventParams,
  PageViewParams,
} from './types';

export { GAEvent, CustomEvent } from './types';
