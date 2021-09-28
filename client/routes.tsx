import * as React from 'react';
import {
  Redirect,
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

export const publicRouteMap: { [k: string]: any } = {
  '/login': AuthLoginPage,
  '/register': AuthRegisterPage,
};

export const privateRouteMap: { [k: string]: any } = {
  '/teams': TeamsListPage,
  '/teams/create': TeamCreatePage,
  '/teams/:teamId': TeamInfoPage,
  '/teams/:teamId/edit': TeamEditPage,
  '/teams/:teamId/tracks/create': TrackCreatePage,
  '/teams/:teamId/tracks/:trackId': TrackInfoPage,
  '/teams/:teamId/tracks/:trackId/edit': TrackCreatePage,
  '/teams/:teamId/members/create': MemberCreatePage,
  '/teams/:teamId/members/:memberId': MemberInfoPage,
  '/teams/:teamId/members/:memberId/edit': MemberCreatePage,
};

type ComputedMatch = {
  isExact: boolean;
  params: { [k: string]: string };
  path: string;
  url: string;
};

type PrivateCustomRouteProps = RouteProps & {
  component: any;
  computedMatch?: ComputedMatch;
};

export type PrivateComponentProps = {
  user: UserAuthResponseTrue;
  match: undefined | ComputedMatch;
};

export const PrivateRoute = ({ component: Component, ...rest }: PrivateCustomRouteProps) => {
  const location = useLocation();
  const { isLoading, user } = useAuth(location.pathname);

  if (isLoading) return <Loader />;

  if (!user) return <Redirect to="/login" />;

  return <Component {...rest} user={user} match={rest.computedMatch} />;
};


