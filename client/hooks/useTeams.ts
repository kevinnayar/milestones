import { useState, useEffect } from 'react';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { teamGetTeams } from '../store/reducers/teams';
import {
  hasFetchNotStarted,
  hasFetchSucceeded,
  hasFetchFailed,
} from '../../shared/utils/asyncUtils';
import { RootState } from '../store/store';
import { EntityTeam } from '../../shared/types/entityTypes';

type UseTeamsResult = {
  isLoading: boolean;
  teams: null | EntityTeam[];
};

export function useTeams(): UseTeamsResult {
  const { auth, self } = useAppSelector((state: RootState) => state.user);
  const { all: allTeams } = useAppSelector((state: RootState) => state.teams);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      hasFetchSucceeded(self) &&
      hasFetchNotStarted(allTeams) &&
      auth.data &&
      auth.data.userId &&
      auth.data.token &&
      auth.data.isAuthenticated
    ) {
      const { userId, token } = auth.data;
      dispatch(teamGetTeams({ userId, token }));
    }
  }, [dispatch, auth.data, self, allTeams]);

  useEffect(() => {
    if (hasFetchFailed(allTeams) || hasFetchSucceeded(allTeams)) {
      setIsLoading(false);
    }
  }, [allTeams]);

  return {
    isLoading,
    teams: allTeams.data ? allTeams.data : null,
  };
}
