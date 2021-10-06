import { configureStore } from '@reduxjs/toolkit';
import user, { UserReducer } from './reducers/user';
import teams, { TeamsReducer } from './reducers/teams';
import tracks, { TracksReducer } from './reducers/tracks';
import members, { MembersReducer } from './reducers/members';

export const store = configureStore({
  reducer: {
    user,
    teams,
    tracks,
    members,
  },
});

export type RootState = {
  user: UserReducer;
  teams: TeamsReducer;
  tracks: TracksReducer;
  members: MembersReducer;
};

export type AppDispatch = typeof store.dispatch;

