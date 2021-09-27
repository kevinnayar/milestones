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
import { Loader } from './components/Loader/Loader';
import { AuthLoginPage } from './pages/AuthLoginPage';
import { AuthRegisterPage } from './pages/AuthRegisterPage';
import { TeamsPage } from './pages/TeamsPage';
import { TeamCreatePage } from './pages/TeamCreatePage';
import { TeamViewPage } from './pages/TeamViewPage';
import { TeamUpdatePage } from './pages/TeamUpdatePage';
import { TrackPage } from './pages/TrackPage';
import { TrackCreatePage } from './pages/TrackCreatePage';
import { MemberPage } from './pages/MemberPage';
import { MemberCreatePage } from './pages/MemberCreatePage';
import { UserAuthResponseTrue } from '../common/types/entityTypes';

type ComputedMatch = {
  isExact: boolean,
  params: { [k: string]: string },
  path: string,
  url: string,
};

type PrivateCustomRouteProps = RouteProps & {
  component: any,
  computedMatch?: ComputedMatch,
};

export type PrivateComponentProps = {
  user: UserAuthResponseTrue;
  match: undefined | ComputedMatch,
};

const PrivateRoute = ({ component: Component, ...rest }: PrivateCustomRouteProps) => {
  const location = useLocation();
  const { isLoading, user } = useAuth(location.pathname);

  if (isLoading) return <Loader />;
  if (!user) return <Redirect to="/login" />;
  return (
    <Component
      {...rest}
      user={user}
      match={rest.computedMatch}
    />
  );
};

export default function App() {
  return (
    <Router>
      <div className="app">
        <Redirect exact from="/" to="/login" />
        <Switch>
          <Route path="/login" exact component={AuthLoginPage} />
          <Route path="/register" exact component={AuthRegisterPage} />

          <PrivateRoute path="/teams" exact component={TeamsPage} />

          <PrivateRoute path="/teams/create" exact component={TeamCreatePage} />
          <PrivateRoute path="/teams/:teamId" exact component={TeamViewPage} />
          <PrivateRoute path="/teams/:teamId/update" exact component={TeamUpdatePage} />

          <PrivateRoute path="/teams/:teamId/tracks/create" exact component={TrackCreatePage} />
          <PrivateRoute path="/teams/:teamId/tracks/:trackId" exact component={TrackPage} />
          <PrivateRoute path="/teams/:teamId/members/create" exact component={MemberCreatePage} />
          <PrivateRoute path="/teams/:teamId/members/:teamId" exact component={MemberPage} />
        </Switch>
      </div>
    </Router>
  );
}



