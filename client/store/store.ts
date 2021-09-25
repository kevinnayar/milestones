import { configureStore } from '@reduxjs/toolkit';
import user, { UserReducer } from './reducers/user';
import teams, { TeamsReducer } from './reducers/teams';
import tracks, { TracksReducer } from './reducers/tracks';

export const store = configureStore({
  reducer: {
    user,
    teams,
    tracks,
  },
});

export type RootState = {
  user: UserReducer;
  teams: TeamsReducer;
  tracks: TracksReducer;
};

export type AppDispatch = typeof store.dispatch;

