import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AppHeader } from './components/AppHeader/AppHeader';
import { AppContent } from './components/AppContent/AppContent';
import { AppFooter } from './components/AppFooter/AppFooter';

import { Branding } from './components/Branding/Branding';
import { MainNav } from './components/MainNav/MainNav';
import { ThemeSwitch } from './components/ThemeSwitch/ThemeSwitch';
import ThemeHelper from '../shared/helpers/ThemeHelper';

import { Profile } from './pages/Profile';

// Password1!

export default function App() {
  const brand = 'milestones';
  const themeHelper = new ThemeHelper(window.localStorage);
  document.body.classList.add(themeHelper.getLocalTheme());

  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader>
          <Branding brand={brand} />
          <MainNav />
          <ThemeSwitch themeHelper={themeHelper} />
        </AppHeader>

        <AppContent>
          <Switch>
            <Route path="/dashboard" exact component={() => <h1>Dashboard</h1>} />
            <Route path="/configure" exact component={() => <h1>Configure</h1>} />
            <Route path="/account" exact component={Profile} />
          </Switch>
        </AppContent>

        <AppFooter>
          <p>
            &copy; <span>{brand}</span> {new Date().getFullYear()}, All Rights Reserved.
          </p>
        </AppFooter>
      </div>
    </BrowserRouter>
  );
}
