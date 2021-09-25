/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../shared/helpers/ApiClient';
import {
  fetchInit,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
} from '../../../shared/utils/asyncUtils';
import { AuthCredentialsPlus } from '../../../shared/types/baseTypes';
import { EntityTrack, TrackCreateParams } from '../../../shared/types/entityTypes';
import { FetchState } from '../../../shared/types/baseTypes';

export type TracksReducer = {
  allTracks: FetchState<EntityTrack[]>;
  createdTrack: FetchState<EntityTrack>;
  currentTrack: FetchState<EntityTrack>;
};

const initialState: TracksReducer = {
  allTracks: fetchInit(),
  createdTrack: fetchInit(),
  currentTrack: fetchInit(),
};

export const getTracks = createAsyncThunk<EntityTrack[], AuthCredentialsPlus<{ teamId: string }>>(
  'tracks/getTracks',
  async ({ userId, token, extra }) => {
    const tracks: EntityTrack[] = await apiClient.post(`/users/${userId}/teams/${extra.teamId}/tracks`, { token });
    return tracks;
  },
);

export const createTrack = createAsyncThunk<EntityTrack, AuthCredentialsPlus<TrackCreateParams>>(
  'tracks/createTrack',
  async ({ userId, token, extra }) => {
    const track: EntityTrack = await apiClient.post(`/users/${userId}/teams/${extra.teamId}/tracks/create`, {
      token,
      body: extra,
    });
    return track;
  },
);

export const getTrack = createAsyncThunk<undefined | EntityTrack, AuthCredentialsPlus<{ teamId: string, trackId: string }>>(
  'tracks/getTrack',
  async ({ userId, token, extra }) => {
    const track: undefined | EntityTrack = await apiClient.post(`/users/${userId}/teams/${extra.teamId}/tracks/${extra.trackId}`, { token });
    return track;
  },
);

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    resetCreateTrack: (state) => {
      state.createdTrack = fetchInit();
    },
  },
  extraReducers: (builder) => {
    builder
      // getTracks
      .addCase(getTracks.pending, (state) => {
        state.allTracks = fetchRequest();
      })
      .addCase(getTracks.fulfilled, (state, action: PayloadAction<EntityTrack[]>) => {
        state.allTracks = fetchSuccess(action.payload);
      })
      .addCase(getTracks.rejected, (state, action) => {
        state.allTracks = fetchFailure(action.error.message);
      })
      // createTrack
      .addCase(createTrack.pending, (state) => {
        state.createdTrack = fetchRequest();
      })
      .addCase(createTrack.fulfilled, (state, action: PayloadAction<EntityTrack>) => {
        state.createdTrack = fetchSuccess(action.payload);
      })
      .addCase(createTrack.rejected, (state, action) => {
        state.createdTrack = fetchFailure(action.error.message);
      })
      // getTrack
      .addCase(getTrack.pending, (state) => {
        state.currentTrack = fetchRequest();
      })
      .addCase(getTrack.fulfilled, (state, action: PayloadAction<undefined | EntityTrack>) => {
        state.currentTrack = fetchSuccess(action.payload);
      })
      .addCase(getTrack.rejected, (state, action) => {
        state.currentTrack = fetchFailure(action.error.message);
      });
  },
});

export const { resetCreateTrack } = tracksSlice.actions;

export default tracksSlice.reducer;



