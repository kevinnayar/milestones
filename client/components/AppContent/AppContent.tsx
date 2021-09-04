import * as React from 'react';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export const AppContent = React.memo((props: { children: any }) => {
  return (
    <main className="app-content">
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </main>
  );
});

