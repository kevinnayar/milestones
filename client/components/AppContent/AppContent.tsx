import * as React from 'react';
// import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export const AppContent = (props: { children: any }) => {
  return (
    <main className="app-content">
      {/* <ErrorBoundary>{props.children}</ErrorBoundary> */}
      {props.children}
    </main>
  );
};

