# ToDo Frontend

Next.js 15 frontend application for the ToDo monorepo project.

## Features

- ⚡ **Next.js 15** with App Router and Turbopack
- 🎨 **Tailwind CSS 4** for styling
- 📊 **Google Analytics** integration with custom hooks
- 🔒 **Type-safe** with TypeScript and shared types
- 🚀 **SSR & SSG** support
- 📱 **Responsive** design

## Tech Stack

- [Next.js](https://nextjs.org/) (v15.5.4)
- [React](https://react.dev/) (v19.1.0)
- [TypeScript](https://www.typescriptlang.org/) (v5)
- [Tailwind CSS](https://tailwindcss.com/) (v4)
- [@to-do/shared](../shared) - Shared types
- [@to-do/analytics](../../packages/analytics) - Analytics package

## Getting Started

### Prerequisites

Make sure you have the backend running on `http://localhost:3001`.

### Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Add your Google Analytics ID (optional):

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Development

```bash
# Install dependencies (from root)
yarn install

# Run dev server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
# Build for production
yarn build

# Start production server
yarn start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with GA setup
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── favicon.ico
└── components/
    ├── AnalyticsProvider.tsx  # Analytics initialization
    └── PageContainer.tsx      # Page view tracking wrapper
```

## Analytics

This app uses the `@to-do/analytics` package for tracking.

### Automatic Page Tracking

Wrap your page content with `PageContainer`:

```tsx
import { PageContainer } from '@/components/PageContainer';

export default function Page() {
  return (
    <PageContainer title="My Page" path="/my-page">
      {/* Your content */}
    </PageContainer>
  );
}
```

### Manual Event Tracking

```tsx
'use client';

import { useAnalytics, CustomEvent } from '@to-do/analytics';

export default function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleAction = () => {
    trackEvent(CustomEvent.TODO_CREATED, {
      todo_id: 123,
    });
  };

  return <button onClick={handleAction}>Create</button>;
}
```

## API Integration

The frontend connects to the backend API at `http://localhost:3001/api`.

Example:

```tsx
import { TToDo } from '@to-do/shared';

const response = await fetch('http://localhost:3001/api/todos');
const todos = (await response.json()) as TToDo[];
```

## Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production with Turbopack
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Analytics Package](../../packages/analytics/README.md)

## Deploy

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push to GitHub
2. Import project in Vercel
3. Set root directory to `apps/to-do`
4. Add environment variables
5. Deploy

For more details, see the [main README](../../README.md).
