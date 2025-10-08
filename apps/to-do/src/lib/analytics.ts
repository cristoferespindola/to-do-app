import { initAnalytics } from '@to-do/analytics';

// Initialize analytics (call this once when the app starts)
export const analytics = initAnalytics({
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  debug: process.env.NODE_ENV === 'development',
  disabled: !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
});
