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
  EntityTrack,
  TrackReduction,
  TrackUpsertParams,
  UserTeamGuids,
  UserTeamTrackGuids,
} from '../../../common/types/entityTypes';
import { FetchState } from '../../../common/types/baseTypes';

export type TracksReducer = {
  teamTracks: FetchState<EntityTrack[]>;
  createdTrack: FetchState<EntityTrack>;
  currentTrack: FetchState<EntityTrack>;
  currentTrackReduction: FetchState<TrackReduction>;
};

const initialState: TracksReducer = {
  teamTracks: fetchInit(),
  createdTrack: fetchInit(),
  currentTrack: fetchInit(),
  currentTrackReduction: fetchInit(),
};

export const getTracks = createAsyncThunk<EntityTrack[], UserTeamGuids>(
  'tracks/getTracks',
  async ({ userId, teamId }) => {
    const tracks: EntityTrack[] = await apiClient.post(`/users/${userId}/teams/${teamId}/tracks`);
    return tracks;
  },
);

export const createTrack = createAsyncThunk<EntityTrack, UserTeamGuids & { body: TrackUpsertParams }>(
  'tracks/createTrack',
  async ({ userId, teamId, body }) => {
    const track: EntityTrack = await apiClient.post(
      `/users/${userId}/teams/${teamId}/tracks/create`,
      {
        body,
      },
    );
    return track;
  },
);

export const getTrack = createAsyncThunk<
  undefined | EntityTrack,
  UserTeamTrackGuids
>('tracks/getTrack', async ({ userId, teamId, trackId }) => {
  const track: undefined | EntityTrack = await apiClient.post(
    `/users/${userId}/teams/${teamId}/tracks/${trackId}`,
  );
  return track;
});

export const updateTrack = createAsyncThunk<
  EntityTrack,
  UserTeamTrackGuids & { body: TrackUpsertParams }
>('tracks/updateTrack', async ({ userId, teamId, trackId, body }) => {
  const track: EntityTrack = await apiClient.put(
    `/users/${userId}/teams/${teamId}/tracks/${trackId}`,
    {
      body,
    },
  );
  return track;
});

export const getTrackReduction = createAsyncThunk<TrackReduction, UserTeamTrackGuids>(
  'tracks/getTrackReduction',
  async ({ userId, teamId, trackId }) => {
    const reduction: TrackReduction = await apiClient.post(
      `/users/${userId}/teams/${teamId}/tracks/${trackId}/reduction`,
    );
    return reduction;
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
        state.teamTracks = fetchRequest();
      })
      .addCase(getTracks.fulfilled, (state, action: PayloadAction<EntityTrack[]>) => {
        state.teamTracks = fetchSuccess(action.payload);
      })
      .addCase(getTracks.rejected, (state, action) => {
        state.teamTracks = fetchFailure(action.error.message);
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
      })
      // updateTrack
      .addCase(updateTrack.pending, (state) => {
        state.currentTrack = fetchRequest();
      })
      .addCase(updateTrack.fulfilled, (state, action: PayloadAction<undefined | EntityTrack>) => {
        state.currentTrack = fetchSuccess(action.payload);
      })
      .addCase(updateTrack.rejected, (state, action) => {
        state.currentTrack = fetchFailure(action.error.message);
      })
      // getTrackReduction
      .addCase(getTrackReduction.pending, (state) => {
        state.currentTrackReduction = fetchRequest();
      })
      .addCase(
        getTrackReduction.fulfilled,
        (state, action: PayloadAction<undefined | TrackReduction>) => {
          state.currentTrackReduction = fetchSuccess(action.payload);
        },
      )
      .addCase(getTrackReduction.rejected, (state, action) => {
        state.currentTrackReduction = fetchFailure(action.error.message);
      });
  },
});

export const { resetCreateTrack } = tracksSlice.actions;

export default tracksSlice.reducer;
