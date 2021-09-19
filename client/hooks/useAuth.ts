import { useState, useEffect } from 'react';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';

import { setLoginRedirectPath, userRefreshToken } from '../store/reducers/user';
import { hasFetchNotStarted, hasFetchSucceeded, hasFetchFailed } from '../../shared/utils/asyncUtils';
import { RootState } from '../store/store';

type UseAuthResult = {
  isLoading: boolean;
  isAuthenticated: boolean;
  userId: null | string,
};

export function useAuth(path: string): UseAuthResult {
  const { auth, loginRedirectPath } = useAppSelector((state: RootState) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(auth.data ? auth.data.isAuthenticated : false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  // set login redirect path
  useEffect(() => {
    if (!isAuthenticated && path !== loginRedirectPath) {
      dispatch(setLoginRedirectPath(path));
    }
  }, [dispatch, isAuthenticated, path, loginRedirectPath]);

  // check token
  useEffect(() => {
    if (!isAuthenticated && hasFetchNotStarted(auth)) {
      dispatch(userRefreshToken());
    }
  }, [dispatch, auth, isAuthenticated]);

  // set complete
  useEffect(() => {
    if (hasFetchFailed(auth) || hasFetchSucceeded(auth)) {
      setIsLoading(false);
      setIsAuthenticated(auth.data.isAuthenticated);
    }
  }, [auth]);

  return {
    isLoading,
    isAuthenticated,
    userId: auth.data ? auth.data.userId : null,
  };
}


