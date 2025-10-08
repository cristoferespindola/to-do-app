/**
 * Google Analytics Event Parameters
 */
export type GTagEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Standard Google Analytics Events
 */
export enum GAEvent {
  PAGE_VIEW = 'page_view',
  CLICK = 'click',
  FORM_SUBMIT = 'form_submit',
  SEARCH = 'search',
  SHARE = 'share',
  LOGIN = 'login',
  SIGN_UP = 'sign_up',
  PURCHASE = 'purchase',
  ADD_TO_CART = 'add_to_cart',
  REMOVE_FROM_CART = 'remove_from_cart',
}

/**
 * Custom Application Events
 */
export enum CustomEvent {
  TODO_CREATED = 'todo_created',
  TODO_COMPLETED = 'todo_completed',
  TODO_DELETED = 'todo_deleted',
  TODO_UPDATED = 'todo_updated',
}

/**
 * All available events
 */
export type AnalyticsEvent = GAEvent | CustomEvent | string;

/**
 * Page view parameters
 */
export type PageViewParams = {
  page_title?: string;
  page_location?: string;
  page_path?: string;
}

/**
 * Analytics configuration
 */
export type AnalyticsConfig = {
  measurementId: string;
  debug?: boolean;
  disabled?: boolean;
}

/**
 * Window gtag type definition
 */
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string | AnalyticsEvent,
      params?: GTagEventParams | PageViewParams
    ) => void;
    dataLayer?: unknown[];
  }
}
