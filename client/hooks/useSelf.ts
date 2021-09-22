import { useState, useEffect } from 'react';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';

import { userGetSelf } from '../store/reducers/user';
import {
  hasFetchNotStarted,
  hasFetchSucceeded,
  hasFetchFailed,
} from '../../shared/utils/asyncUtils';
import { RootState } from '../store/store';
import { UserNoPII } from '../../shared/types/entityTypes';

type UseSelfResult = {
  isLoading: boolean;
  self: null | UserNoPII;
};

export function useSelf(): UseSelfResult {
  const { auth, self } = useAppSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasFetchNotStarted(self) && auth.data && auth.data.token && auth.data.isAuthenticated) {
      dispatch(userGetSelf(auth.data.token));
    }
  }, [dispatch, auth.data, self]);

  useEffect(() => {
    if (hasFetchFailed(self) || hasFetchSucceeded(self)) {
      setIsLoading(false);
    }
  }, [self]);

  return {
    isLoading,
    self: self.data ? self.data : null,
  };
}
