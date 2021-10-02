import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';

import { setLoginRedirectPath, userRefreshToken, userGetSelf } from '../store/reducers/user';
import { hasFetchNotStarted, hasFetchSucceeded, hasFetchFailed } from '../../common/utils/asyncUtils';
import { RootState } from '../store/store';
import { UserAuthResponse, UserAuthResponseTrue, UserNoPII } from '../../common/types/entityTypes';

type UseAuthResult = {
  isLoading: boolean;
  user: null | UserAuthResponseTrue,
};

function checkIsLoggedIn(authData: null | UserAuthResponse): boolean {
  return Boolean(
    authData &&
    authData.isAuthenticated === true &&
    authData.userId && typeof authData.userId === 'string' &&
    authData.token && typeof authData.token === 'string' &&
    authData.tokenExpiration && typeof authData.tokenExpiration === 'number' &&
    authData.tokenExpiration > DateTime.now().toMillis(),
  );
}

function checkIfHasSelf(token: null | string, selfData: null | UserNoPII): boolean {
  return Boolean(token && selfData);
}

function getAuthedUserOrNull(authData: null | UserAuthResponse, selfData: null | UserNoPII): null | UserAuthResponseTrue {
  if (
    checkIsLoggedIn(authData) &&
    authData.isAuthenticated &&
    checkIfHasSelf(authData.token, selfData) &&
    authData.userId === selfData.userId
  ) {
    const { isAuthenticated, userId, token, tokenExpiration } = authData;
    const user: UserAuthResponseTrue = {
      isAuthenticated,
      userId,
      token,
      tokenExpiration,
    };
    return user;
  }
  return null;
}

export function useAuth(path?: string): UseAuthResult {
  const { auth, self, loginRedirectPath } = useAppSelector((state: RootState) => state.user);

  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn(auth.data));
  const tokenMaybe = auth.data ? auth.data.token : null;
  const [hasFetchedSelf, setHasFetchedSelf] = useState(checkIfHasSelf(tokenMaybe, self.data));
  const [isLoading, setIsLoading] = useState(isLoggedIn && hasFetchedSelf);

  const dispatch = useAppDispatch();

  // set login redirect path
  useEffect(() => {
    if (!isLoggedIn && path && path !== loginRedirectPath) {
      dispatch(setLoginRedirectPath(path));
    }
  }, [dispatch, isLoggedIn, path, loginRedirectPath]);

  // login
  useEffect(() => {
    if (!isLoggedIn && hasFetchNotStarted(auth)) {
      dispatch(userRefreshToken());
    }
  }, [dispatch, auth, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn && hasFetchSucceeded(auth)) {
      setIsLoggedIn(checkIsLoggedIn(auth.data));
    }
  }, [auth, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn && hasFetchFailed(auth)) {
      setIsLoading(false);
    }
  }, [auth, isLoggedIn]);

  // getSelf
  useEffect(() => {
    if (isLoggedIn && !hasFetchedSelf && hasFetchNotStarted(self)) {
      dispatch(userGetSelf());
    }
  }, [dispatch, auth, isLoggedIn, hasFetchedSelf, self]);

  useEffect(() => {
    if (isLoggedIn && hasFetchSucceeded(self)) {
      setIsLoading(false);
      setHasFetchedSelf(true);
    }
  }, [isLoggedIn, hasFetchedSelf, self]);

  useEffect(() => {
    if (isLoggedIn && hasFetchFailed(self)) {
      setIsLoading(false);
      setHasFetchedSelf(checkIfHasSelf(auth.data.token, self.data));
    }
  }, [isLoggedIn, hasFetchedSelf, auth, self]);


  return {
    isLoading,
    user: getAuthedUserOrNull(auth.data, self.data),
  };
}




