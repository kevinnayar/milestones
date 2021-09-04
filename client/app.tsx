import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { AppHeader } from './components/AppHeader/AppHeader';
import { AppContent } from './components/AppContent/AppContent';
import { AppFooter } from './components/AppFooter/AppFooter';
import { Branding } from './components/Branding/Branding';
import { MainNav } from './components/MainNav/MainNav';
import { ThemeSwitch } from './components/ThemeSwitch/ThemeSwitch';
import ThemeHelper from '../shared/helpers/ThemeHelper';

// Password1!

export default function App() {
  const { user } = useAuth0();

  const brand = 'milestones';
  const themeHelper = new ThemeHelper(window.localStorage);
  document.body.classList.add(themeHelper.getLocalTheme());

  console.log({ user });

  return (
    <Router>
      <div className="app">
        <AppHeader>
          <Branding brand={brand} />
          <MainNav />
          <ThemeSwitch themeHelper={themeHelper} />
        </AppHeader>

        <AppContent>
          <h1>hello{user && <span> {user.name}</span>}!</h1>
        </AppContent>

        <AppFooter>
          <p>
            &copy; <span>{brand}</span> {new Date().getFullYear()}, All Rights Reserved.
          </p>
        </AppFooter>
      </div>
    </Router>
  );
}
