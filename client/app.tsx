import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  RouteProps,
  useLocation,
} from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';

import { AppHeader } from './components/AppHeader/AppHeader';
import { AppContent } from './components/AppContent/AppContent';
import { AppFooter } from './components/AppFooter/AppFooter';
import { Loader } from './components/Loader/Loader';

import { AuthLoginPage } from './pages/AuthLoginPage';
import { AuthRegisterPage } from './pages/AuthRegisterPage';
import { TeamsPage } from './pages/TeamsPage';
import { TeamCreatePage } from './pages/TeamCreatePage';
import { TeamPage } from './pages/TeamPage';
import { TrackPage } from './pages/TrackPage';
import { TrackCreatePage } from './pages/TrackCreatePage';
import { MemberPage } from './pages/MemberPage';
import { MemberCreatePage } from './pages/MemberCreatePage';
import { UserAuthResponseTrue } from '../shared/types/entityTypes';

type ComputedMatch = {
  isExact: boolean,
  params: { [k: string]: string },
  path: string,
  url: string,
};

type PrivateCustomRouteProps = RouteProps & { component: any, computedMatch?: ComputedMatch };

export type PrivateComponentProps = { user: UserAuthResponseTrue; match: undefined | ComputedMatch };

const PrivateRoute = ({ component: Component, ...rest }: PrivateCustomRouteProps) => {
  const location = useLocation();
  const { isLoading, user } = useAuth(location.pathname);

  if (isLoading) return <Loader />;
  if (!user) return <Redirect to="/login" />;
  return <Component {...rest} user={user} match={rest.computedMatch} />;
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

            <PrivateRoute exact path="/teams" component={TeamsPage} />
            <PrivateRoute exact path="/teams/create" component={TeamCreatePage} />
            <PrivateRoute path="/teams/:teamId" component={TeamPage} />
            <PrivateRoute exact path="/teams/:teamId/tracks/create" component={TrackCreatePage} />
            <PrivateRoute exact path="/teams/:teamId/tracks/:trackId" component={TrackPage} />
            <PrivateRoute exact path="/teams/:teamId/members/create" component={MemberCreatePage} />
            <PrivateRoute exact path="/teams/:teamId/members/:teamId" component={MemberPage} />
          </Switch>
        </AppContent>
        <AppFooter brand={brand} />
      </div>
    </Router>
  );
}

