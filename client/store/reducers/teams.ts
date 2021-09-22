/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../shared/helpers/ApiClient';
import {
  fetchInit,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
} from '../../../shared/utils/asyncUtils';
import { EntityTeam } from '../../../shared/types/entityTypes';
import { FetchState } from '../../../shared/types/baseTypes';

export type TeamsReducer = {
  all: FetchState<EntityTeam[]>;
};

const initialState: TeamsReducer = {
  all: fetchInit(),
};

type AuthCredentials = {
  userId: string;
  token: string;
};

export const teamGetTeams = createAsyncThunk<EntityTeam[], AuthCredentials>(
  'team/getTeams',
  async ({ userId, token }) => {
    const teams: EntityTeam[] = await apiClient.post(`/users/${userId}/teams`, { token });
    return teams;
  },
);

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(teamGetTeams.pending, (state) => {
        state.all = fetchRequest();
      })
      .addCase(teamGetTeams.fulfilled, (state, action: PayloadAction<EntityTeam[]>) => {
        state.all = fetchSuccess(action.payload);
      })
      .addCase(teamGetTeams.rejected, (state, action) => {
        state.all = fetchFailure(action.error.message);
      });
  },
});

export default teamSlice.reducer;


