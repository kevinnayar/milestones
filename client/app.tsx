import * as React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from './hooks/useAppSelector';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useTheme } from './hooks/useTheme';
import { setLoginRedirectPath } from './store/reducers/user';
import { RootState } from './store/store';

import { AppHeader } from './components/AppHeader/AppHeader';
import { AppContent } from './components/AppContent/AppContent';
import { AppFooter } from './components/AppFooter/AppFooter';

import { AuthLoginPage } from './pages/AuthLoginPage';
import { AuthRegisterPage } from './pages/AuthRegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ConfigurePage } from './pages/ConfigurePage';
import { AccountPage } from './pages/AccountPage';

type PrivateRouteProps = RouteProps & { component: any };

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { auth } = useAppSelector((state: RootState) => state.user);
  const isAuthenticated = auth.data ? auth.data.isAuthenticated : false;
  const dispatch = useAppDispatch();

  if (!isAuthenticated) {
    dispatch(setLoginRedirectPath(rest.path as string));
    return <Redirect to="/login" />;
  }

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
            <PrivateRoute exact path="/dashboard" component={DashboardPage} />
            <PrivateRoute exact path="/configure" component={ConfigurePage} />
            <PrivateRoute exact path="/account" component={AccountPage} />
          </Switch>
        </AppContent>
        <AppFooter brand={brand} />
      </div>
    </Router>
  );
}

