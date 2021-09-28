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
import { UserAuthResponseTrue } from '../common/types/entityTypes';
import { Loader } from './components/Loader/Loader';
import { AuthLoginPage } from './pages/Auth/AuthLoginPage';
import { AuthRegisterPage } from './pages/Auth/AuthRegisterPage';
import { TeamsListPage } from './pages/Teams/TeamsListPage';
import { TeamCreatePage } from './pages/Teams/TeamCreatePage';
import { TeamInfoPage } from './pages/Teams/TeamInfoPage';
import { TeamEditPage } from './pages/Teams/TeamEditPage';
import { TrackInfoPage } from './pages/Tracks/TrackInfoPage';
import { TrackCreatePage } from './pages/Tracks/TrackCreatePage';
import { MemberInfoPage } from './pages/Members/MemberInfoPage';
import { MemberCreatePage } from './pages/Members/MemberCreatePage';

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

          <PrivateRoute path="/teams" exact component={TeamsListPage} />

          <PrivateRoute path="/teams/create" exact component={TeamCreatePage} />
          <PrivateRoute path="/teams/:teamId" exact component={TeamInfoPage} />
          <PrivateRoute path="/teams/:teamId/edit" exact component={TeamEditPage} />

          <PrivateRoute path="/teams/:teamId/tracks/create" exact component={TrackCreatePage} />
          <PrivateRoute path="/teams/:teamId/tracks/:trackId" exact component={TrackInfoPage} />
          <PrivateRoute path="/teams/:teamId/tracks/:trackId/edit" exact component={TrackCreatePage} />

          <PrivateRoute path="/teams/:teamId/members/create" exact component={MemberCreatePage} />
          <PrivateRoute path="/teams/:teamId/members/:memberId" exact component={MemberInfoPage} />
          <PrivateRoute path="/teams/:teamId/members/:memberId/edit" exact component={MemberCreatePage} />
        </Switch>
      </div>
    </Router>
  );
}



