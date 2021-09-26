import * as React from 'react';
import { useTheme } from '../hooks/useTheme';
import { AuthLinks } from '../components/Auth/AuthLinks';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { AppContent } from '../components/AppContent/AppContent';
import { AppFooter } from '../components/AppFooter/AppFooter';

export const AuthPageTemplate = (props: { children: any }) => {
  const brand = 'milestones';
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app public">
      <AppHeader brand={brand} theme={theme} toggleTheme={toggleTheme} />
      <AppContent>
        <div className="auth-page">
          <AuthLinks />
          {props.children}
        </div>
      </AppContent>
      <AppFooter brand={brand} />
    </div>
  );
};
