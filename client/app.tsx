import * as React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';

import { AppHeader } from './components/AppHeader/AppHeader';
import { AppContent } from './components/AppContent/AppContent';
import { AppFooter } from './components/AppFooter/AppFooter';

import { AuthLoginPage } from './pages/AuthLoginPage';
import { AuthRegisterPage } from './pages/AuthRegisterPage';
import { TracksPage } from './pages/TracksPage';
import { TeamPage } from './pages/TeamPage';
import { Loader } from './components/Loader/Loader';

type CustomRoute = RouteProps & { component: any };

export const PrivateRoute = ({ component: Component, ...rest }: CustomRoute) => {
  const { isLoading, isAuthenticated } = useAuth(rest.path as string);

  if (isLoading) return <Loader />;

  if (!isAuthenticated) return <Redirect to="/login" />;

  return <Component {...rest} />;
};

export default function App() {
  const brand = 'milestones';
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="app">
        <AppHeader brand={brand} theme={theme} toggleTheme={toggleTheme} />
        <AppContent>
          <Redirect from="/" to="/login" />
          <Switch>
            <Route exact path="/login" component={AuthLoginPage} />
            <Route exact path="/register" component={AuthRegisterPage} />
            <PrivateRoute exact path="/tracks" component={TracksPage} />
            <PrivateRoute exact path="/team" component={TeamPage} />
          </Switch>
        </AppContent>
        <AppFooter brand={brand} />
      </div>
    </Router>
  );
}

