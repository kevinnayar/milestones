/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../store';

import config from '../../clientConfig';
import { xferInit, xferRequest, xferSuccess, xferFailure, callApi } from '../../../shared/utils/asyncUtils';
import { formatError } from '../../../shared/utils/baseUtils';
import { RootState } from '../store';
import { EntityTeam } from '../../../shared/types/entityTypes';
import { ApiTransferStatus } from '../../../shared/types/baseTypes';

export type TeamReducer = {
  teamXfer: ApiTransferStatus;
  team: null | EntityTeam;
};

const initialState: TeamReducer = {
  teamXfer: xferInit(),
  team: null,
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeamXfer: (state, action: PayloadAction<ApiTransferStatus>) => {
      state.teamXfer = action.payload;
    },
    setTeam: (state, action: PayloadAction<null | EntityTeam>) => {
      state.team = action.payload;
    },
  },
});

const { setTeamXfer, setTeam } = teamSlice.actions;

export const getTeam = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const state = getState();
    const { isAuthenticated, userId, token, tokenExpiration } = state.user.auth;
    if (!isAuthenticated || !userId || !token || !tokenExpiration) {
      console.log('not authed!');
      return;
    }

    const requested = xferRequest();
    dispatch(setTeamXfer(requested));

    const opts = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId }),
    };
    const team: null | EntityTeam = await callApi(
      `${config.api.baseUrl}/api/v1/users/${userId}/teams`,
      opts,
    ) || null;
    dispatch(setTeam(team));

    const succeeded = xferSuccess();
    dispatch(setTeamXfer(succeeded));
  } catch (e) {
    const error = formatError(e);
    const failed = xferFailure(error);
    dispatch(setTeamXfer(failed));
  }
};

export default teamSlice.reducer;
