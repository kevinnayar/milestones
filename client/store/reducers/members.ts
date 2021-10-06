/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../common/helpers/ApiClient';
import {
  fetchInit,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
} from '../../../common/utils/asyncUtils';
import {
  TeamMember,
  UserTeamGuids,
} from '../../../common/types/entityTypes';
import { FetchState } from '../../../common/types/baseTypes';
import { userLogout } from './user';

export type MembersReducer = {
  teamMembers: FetchState<TeamMember[]>;
};

const initialState: MembersReducer = {
  teamMembers: fetchInit(),
};

export const getMembers = createAsyncThunk<TeamMember[], UserTeamGuids>(
  'members/getMembers',
  async ({ userId, teamId }) => {
    const members: TeamMember[] = await apiClient.post(`/users/${userId}/teams/${teamId}/members`);
    return members;
  },
);

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getMembers
      .addCase(getMembers.pending, (state) => {
        state.teamMembers = fetchRequest();
      })
      .addCase(getMembers.fulfilled, (state, action: PayloadAction<TeamMember[]>) => {
        state.teamMembers = fetchSuccess(action.payload);
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.teamMembers = fetchFailure(action.error.message);
      })
      // userLogout
      .addCase(userLogout.fulfilled, (state) => {
        state.teamMembers = fetchInit();
      });
  },
});

export default membersSlice.reducer;
