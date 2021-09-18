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

export type TeamReducer = {
  current: FetchState<null | EntityTeam>;
};

const initialState: TeamReducer = {
  current: fetchInit(),
};

type AuthCredentials = {
  userId: string;
  token: string;
};

export const teamGetTeam = createAsyncThunk<null | EntityTeam, AuthCredentials>(
  'team/getTeam',
  async ({ userId, token }) => {
    const teams: null | EntityTeam = await apiClient.post(`/users/${userId}/teams`, { token });
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
      .addCase(teamGetTeam.pending, (state) => {
        state.current = fetchRequest();
      })
      .addCase(teamGetTeam.fulfilled, (state, action: PayloadAction<null | EntityTeam>) => {
        state.current = fetchSuccess(action.payload);
      })
      .addCase(teamGetTeam.rejected, (state, action) => {
        state.current = fetchFailure(action.error.message);
      });
  },
});

export default teamSlice.reducer;


