'use client';

import { usePageView } from '@to-do/analytics';
import { type ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  title?: string;
  path?: string;
}

/**
 * Client component wrapper that automatically tracks page views
 * Use this to wrap your page content while keeping the page as a Server Component
 */
export function PageContainer({ children, title, path }: PageContainerProps) {
  // Automatically track page view when component mounts
  usePageView(true, {
    page_title: title,
    page_path: path,
  });

  return <>{children}</>;
}
