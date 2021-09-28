/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../common/helpers/ApiClient';
import {
  fetchInit,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
} from '../../../common/utils/asyncUtils';
import { AuthCredentials, AuthCredentialsPlus } from '../../../common/types/baseTypes';
import { EntityTeam, TeamUpsertParams } from '../../../common/types/entityTypes';
import { FetchState } from '../../../common/types/baseTypes';

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

export const getTeams = createAsyncThunk<EntityTeam[], AuthCredentials>(
  'teams/getTeams',
  async ({ userId, token }) => {
    const teams: EntityTeam[] = await apiClient.post(`/users/${userId}/teams`, { token });
    return teams;
  },
);

export const createTeam = createAsyncThunk<EntityTeam, AuthCredentialsPlus<TeamUpsertParams>>(
  'teams/createTeam',
  async ({ userId, token, extra }) => {
    const team: EntityTeam = await apiClient.post(`/users/${userId}/teams/create`, {
      token,
      body: extra,
    });
    return team;
  },
);

export const getTeam = createAsyncThunk<
  undefined | EntityTeam,
  AuthCredentialsPlus<{ teamId: string }>
>('teams/getTeam', async ({ userId, token, extra }) => {
  const team: undefined | EntityTeam = await apiClient.post(
    `/users/${userId}/teams/${extra.teamId}`,
    { token },
  );
  return team;
});

export const updateTeam = createAsyncThunk<
  EntityTeam,
  AuthCredentialsPlus<{ teamId: string; params: TeamUpsertParams }>
>('teams/updateTeam', async ({ userId, token, extra }) => {
  const body = { ...extra.params };
  const team: EntityTeam = await apiClient.put(`/users/${userId}/teams/${extra.teamId}`, {
    token,
    body,
  });
  return team;
});


export const teamsSlice = createSlice({
  name: 'teams',
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
      })
      // updateTeam
      .addCase(updateTeam.pending, (state) => {
        state.currentTeam = fetchRequest();
      })
      .addCase(updateTeam.fulfilled, (state, action: PayloadAction<undefined | EntityTeam>) => {
        state.currentTeam = fetchSuccess(action.payload);
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.currentTeam = fetchFailure(action.error.message);
      });
  },
});

export const { resetCreateTeam } = teamsSlice.actions;

export default teamsSlice.reducer;



