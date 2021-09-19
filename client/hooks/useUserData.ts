import { useState, useEffect } from 'react';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';

import { userGetSelf } from '../store/reducers/user';
import { teamGetTeam } from '../store/reducers/team';
import {
  hasFetchNotStarted,
  hasFetchSucceeded,
  hasFetchFailed,
} from '../../shared/utils/asyncUtils';
import { RootState } from '../store/store';
import { UserNoPII } from '../../shared/types/entityTypes';

type UserDataResult = {
  isLoading: boolean;
  error: null | string;
  self: null | UserNoPII;
};

export function useUserData(): UserDataResult {
  const { auth, self } = useAppSelector((state: RootState) => state.user);
  const { current: currentTeam } = useAppSelector((state: RootState) => state.team);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  // getSelf -> request
  useEffect(() => {
    if (hasFetchNotStarted(self) && auth.data && auth.data.token && auth.data.isAuthenticated) {
      dispatch(userGetSelf(auth.data.token));
    }
  }, [dispatch, auth.data, self]);

  // getSelf -> failure
  useEffect(() => {
    if (hasFetchFailed(self)) {
      setIsLoading(false);
      setError('Failed to get user profile');
    }
  }, [self]);

  // getSelf -> success / getTeam -> request
  useEffect(() => {
    if (
      hasFetchSucceeded(self) &&
      hasFetchNotStarted(currentTeam) &&
      auth.data &&
      auth.data.userId &&
      auth.data.token &&
      auth.data.isAuthenticated
    ) {
      const { userId, token } = auth.data;
      dispatch(teamGetTeam({ userId, token }));
    }
  }, [dispatch, auth.data, self, currentTeam]);

  // getTeam -> failure
  useEffect(() => {
    if (hasFetchFailed(currentTeam)) {
      setIsLoading(false);
      setError('Failed to get team information');
    }
  }, [currentTeam]);

  // getTeam -> success
  useEffect(() => {
    if (hasFetchSucceeded(currentTeam)) {
      setIsLoading(false);
      setError(null);
    }
  }, [currentTeam]);

  return {
    isLoading,
    error,
    self: self && self.data ? self.data : null,
  };
}
