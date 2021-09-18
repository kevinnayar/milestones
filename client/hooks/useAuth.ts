import { useState, useEffect } from 'react';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';

import { setLoginRedirectPath, userRefreshToken, userGetSelf } from '../store/reducers/user';
import { teamGetTeam } from '../store/reducers/team';
import { hasFetchNotStarted, hasFetchSucceeded, hasFetchFailed } from '../../shared/utils/asyncUtils';
import { RootState } from '../store/store';

type UseAuthResult = {
  isLoading: boolean;
  isAuthenticated: boolean;
};

export function useAuth(path: string): UseAuthResult {
  const { auth, self, loginRedirectPath } = useAppSelector((state: RootState) => state.user);
  const { current: currentTeam } = useAppSelector((state: RootState) => state.team);

  const [isAuthenticated, setIsAuthenticated] = useState(auth.data ? auth.data.isAuthenticated : false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated && path !== loginRedirectPath) {
      dispatch(setLoginRedirectPath(path));
    }
  }, [dispatch, isAuthenticated, path, loginRedirectPath]);

  useEffect(() => {
    if (!isAuthenticated && hasFetchNotStarted(auth)) {
      dispatch(userRefreshToken());
    }
  }, [dispatch, auth, isAuthenticated]);

  useEffect(() => {
    if (hasFetchFailed(auth)) {
      setIsLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    if (hasFetchSucceeded(auth) && hasFetchNotStarted(self) && auth.data && auth.data.token) {
      dispatch(userGetSelf(auth.data.token));
    }
  }, [dispatch, auth, self]);

  useEffect(() => {
    if (hasFetchSucceeded(self)) {
      setIsAuthenticated(true);
    }
  }, [self]);

  useEffect(() => {
    if (
      hasFetchNotStarted(currentTeam) &&
      hasFetchSucceeded(auth) &&
      auth.data &&
      auth.data.userId &&
      auth.data.token
    ) {
      const { userId, token } = auth.data;
      dispatch(teamGetTeam({ userId, token }));
    }
  }, [dispatch, auth, currentTeam]);

  useEffect(() => {
    if (hasFetchSucceeded(currentTeam) || hasFetchFailed(currentTeam)) {
      setIsLoading(false);
    }
  }, [dispatch, currentTeam]);

  return {
    isLoading,
    isAuthenticated,
  };
}


