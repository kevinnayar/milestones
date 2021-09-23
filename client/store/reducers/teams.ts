/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../shared/helpers/ApiClient';
import {
  fetchInit,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
} from '../../../shared/utils/asyncUtils';
import { EntityTeam, TeamCreateParams } from '../../../shared/types/entityTypes';
import { FetchState } from '../../../shared/types/baseTypes';

export type TeamsReducer = {
  allTeams: FetchState<EntityTeam[]>;
  createdTeam: FetchState<EntityTeam>;
  currentTeam: FetchState<EntityTeam>;
};

const initialState: TeamsReducer = {
  allTeams: fetchInit(),
  createdTeam: fetchInit(),
  currentTeam: fetchInit(),
};

type AuthCredentials = {
  userId: string;
  token: string;
};

type AuthCredentialsPlus<T> = {
  userId: string;
  token: string;
  extra: T,
};

export const getTeams = createAsyncThunk<EntityTeam[], AuthCredentials>(
  'team/getTeams',
  async ({ userId, token }) => {
    const teams: EntityTeam[] = await apiClient.post(`/users/${userId}/teams`, { token });
    return teams;
  },
);

export const createTeam = createAsyncThunk<EntityTeam, AuthCredentialsPlus<TeamCreateParams>>(
  'team/createTeam',
  async ({ userId, token, extra }) => {
    const team: EntityTeam = await apiClient.post(`/users/${userId}/teams/create`, { token, body: extra });
    return team;
  },
);

export const getTeam = createAsyncThunk<undefined | EntityTeam, AuthCredentialsPlus<{ teamId: string }>>(
  'team/getTeam',
  async ({ userId, token, extra }) => {
    const team: undefined | EntityTeam = await apiClient.post(`/users/${userId}/teams/${extra.teamId}`, { token });
    return team;
  },
);

export const teamsSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    resetCreateTeam: (state) => {
      state.createdTeam = fetchInit();
    },
  },
  extraReducers: (builder) => {
    builder
      // getTeams
      .addCase(getTeams.pending, (state) => {
        state.allTeams = fetchRequest();
      })
      .addCase(getTeams.fulfilled, (state, action: PayloadAction<EntityTeam[]>) => {
        state.allTeams = fetchSuccess(action.payload);
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.allTeams = fetchFailure(action.error.message);
      })
      // createTeam
      .addCase(createTeam.pending, (state) => {
        state.createdTeam = fetchRequest();
      })
      .addCase(createTeam.fulfilled, (state, action: PayloadAction<EntityTeam>) => {
        state.createdTeam = fetchSuccess(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.createdTeam = fetchFailure(action.error.message);
      })
      // getTeam
      .addCase(getTeam.pending, (state) => {
        state.currentTeam = fetchRequest();
      })
      .addCase(getTeam.fulfilled, (state, action: PayloadAction<undefined | EntityTeam>) => {
        state.currentTeam = fetchSuccess(action.payload);
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.currentTeam = fetchFailure(action.error.message);
      });
  },
});

export const { resetCreateTeam } = teamsSlice.actions;

export default teamsSlice.reducer;



