# @to-do/analytics

A type-safe Google Analytics package with React hooks for the ToDo monorepo.

## Features

- 🎯 **Type-Safe**: Full TypeScript support with type definitions
- 🪝 **React Hooks**: Custom hooks for easy integration
- 📊 **GA4 Support**: Built for Google Analytics 4
- 🔒 **SSR Safe**: Works with Next.js server-side rendering
- 🐛 **Debug Mode**: Built-in debugging for development
- 🎨 **Custom Events**: Support for custom application events
- 🚀 **Lightweight**: Minimal dependencies

## Installation

This package is already included in the monorepo. To use it in your app:

```json
// apps/your-app/package.json
{
  "dependencies": {
    "@to-do/analytics": "*"
  }
}
```

Then run:

```bash
yarn install
```

## Setup

### 1. Add Google Analytics Script to Your App

In your Next.js app, add the GA script to `app/layout.tsx`:

```tsx
// apps/to-do/src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Initialize Analytics

Create an analytics initialization file:

```tsx
// apps/to-do/src/lib/analytics.ts
import { initAnalytics } from '@to-do/analytics';

export const analytics = initAnalytics({
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  debug: process.env.NODE_ENV === 'development',
  disabled: !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
});
```

### 3. Add Environment Variable

```bash
# apps/to-do/.env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Usage

### Automatic Page View Tracking

Use the `usePageView` hook to automatically track page views:

```tsx
'use client';

import { usePageView } from '@to-do/analytics';

export default function Page() {
  // Automatically tracks page view on mount
  usePageView();

  return <div>Your page content</div>;
}
```

With custom parameters:

```tsx
usePageView(true, {
  page_title: 'Custom Page Title',
  page_path: '/custom-path',
});
```

### Manual Event Tracking

Use the `useAnalytics` hook for manual event tracking:

```tsx
'use client';

import { useAnalytics, GAEvent } from '@to-do/analytics';

export default function TodoList() {
  const { trackEvent } = useAnalytics();

  const handleCreateTodo = async (title: string) => {
    // Your todo creation logic
    await createTodo(title);

    // Track the event
    trackEvent(GAEvent.FORM_SUBMIT, {
      event_category: 'todo',
      event_label: 'create',
    });
  };

  return <button onClick={() => handleCreateTodo('New Todo')}>Create Todo</button>;
}
```

### Custom Events

Use predefined custom events:

```tsx
import { useAnalytics, CustomEvent } from '@to-do/analytics';

export default function TodoItem({ todo }) {
  const { trackEvent } = useAnalytics();

  const handleComplete = () => {
    trackEvent(CustomEvent.TODO_COMPLETED, {
      todo_id: todo.id,
      todo_title: todo.title,
    });
  };

  const handleDelete = () => {
    trackEvent(CustomEvent.TODO_DELETED, {
      todo_id: todo.id,
    });
  };

  return (
    <div>
      <span>{todo.title}</span>
      <button onClick={handleComplete}>Complete</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
```

### Memoized Event Tracking

Use `useTrackEvent` for memoized event handlers:

```tsx
import { useTrackEvent, GAEvent } from '@to-do/analytics';

export default function SearchBar() {
  const trackSearch = useTrackEvent(GAEvent.SEARCH, {
    event_category: 'search',
  });

  const handleSearch = (query: string) => {
    // Track with additional parameters
    trackSearch({ search_term: query });
  };

  return <input onChange={e => handleSearch(e.target.value)} />;
}
```

### User Properties

Set user properties for analytics:

```tsx
import { useAnalytics } from '@to-do/analytics';

export default function UserProfile({ user }) {
  const { setUserProperties } = useAnalytics();

  useEffect(() => {
    setUserProperties({
      user_id: user.id,
      user_type: user.isPremium ? 'premium' : 'free',
    });
  }, [user, setUserProperties]);

  return <div>User Profile</div>;
}
```

## API Reference

### Hooks

#### `usePageView(enabled?: boolean, params?: PageViewParams)`

Automatically tracks page views.

**Parameters:**

- `enabled` (optional): Enable/disable tracking (default: `true`)
- `params` (optional): Custom page view parameters

**Example:**

```tsx
usePageView(); // Basic usage
usePageView(true, { page_title: 'Custom Title' }); // With params
usePageView(false); // Disabled
```

#### `useAnalytics()`

Provides analytics tracking functions.

**Returns:**

- `trackEvent(event: AnalyticsEvent, params?: GTagEventParams)`: Track custom events
- `setUserProperties(properties: Record<string, string | number | boolean>)`: Set user properties
- `isInitialized: boolean`: Check if analytics is initialized

**Example:**

```tsx
const { trackEvent, setUserProperties } = useAnalytics();
```

#### `useTrackEvent(event: AnalyticsEvent, baseParams?: GTagEventParams)`

Creates a memoized event tracking function.

**Parameters:**

- `event`: The event name to track
- `baseParams` (optional): Base parameters included with every call

**Returns:** Memoized tracking function

**Example:**

```tsx
const trackClick = useTrackEvent('button_click', { category: 'navigation' });
trackClick({ label: 'home' });
```

### Functions

#### `initAnalytics(config: AnalyticsConfig): Analytics`

Initialize the analytics instance.

**Parameters:**

- `config.measurementId`: Google Analytics measurement ID
- `config.debug` (optional): Enable debug mode
- `config.disabled` (optional): Disable analytics

#### `trackEvent(event: AnalyticsEvent, params?: GTagEventParams): void`

Track a custom event (convenience function).

#### `pageView(params?: PageViewParams): void`

Track a page view (convenience function).

#### `setUserProperties(properties: Record<string, string | number | boolean>): void`

Set user properties (convenience function).

### Types

#### `GAEvent` (Enum)

Standard Google Analytics events:

- `PAGE_VIEW`
- `CLICK`
- `FORM_SUBMIT`
- `SEARCH`
- `SHARE`
- `LOGIN`
- `SIGN_UP`
- `PURCHASE`
- `ADD_TO_CART`
- `REMOVE_FROM_CART`

#### `CustomEvent` (Enum)

Application-specific events:

- `TODO_CREATED`
- `TODO_COMPLETED`
- `TODO_DELETED`
- `TODO_UPDATED`

#### `GTagEventParams`

```typescript
type GTagEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
};
```

#### `PageViewParams`

```typescript
type PageViewParams = {
  page_title?: string;
  page_location?: string;
  page_path?: string;
};
```

## Best Practices

1. **Use Environment Variables**: Never hardcode your GA Measurement ID
2. **Enable Debug Mode in Development**: Set `debug: true` for development
3. **Disable in Development**: Consider disabling analytics during local development
4. **Use Type-Safe Events**: Use `GAEvent` and `CustomEvent` enums
5. **Track Meaningful Events**: Only track events that provide valuable insights
6. **Respect User Privacy**: Consider user consent and privacy regulations

## Example: Complete Integration

```tsx
// app/layout.tsx
import Script from 'next/script';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <Script id="ga-init">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx
('use client');

import { usePageView, useAnalytics, CustomEvent } from '@to-do/analytics';
import { initAnalytics } from '@to-do/analytics';

// Initialize once
initAnalytics({
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  debug: process.env.NODE_ENV === 'development',
});

export default function Page() {
  usePageView(); // Auto-track page view
  const { trackEvent } = useAnalytics();

  const handleAction = () => {
    trackEvent(CustomEvent.TODO_CREATED, {
      source: 'homepage',
    });
  };

  return <button onClick={handleAction}>Create Todo</button>;
}
```

## License

MIT
