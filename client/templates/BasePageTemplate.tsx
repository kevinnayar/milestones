import * as React from 'react';
import { useTheme } from '../hooks/useTheme';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { AppContent } from '../components/AppContent/AppContent';
import { AppFooter } from '../components/AppFooter/AppFooter';

export const BasePageTemplate = (props: { children: any }) => {
  const brand = 'milestones';
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app private">
      <AppHeader brand={brand} theme={theme} toggleTheme={toggleTheme} />
      <AppContent>
        <div className="base-page">
          {props.children}
        </div>
      </AppContent>
      <AppFooter brand={brand} />
    </div>
  );
};
