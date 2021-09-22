import { configureStore } from '@reduxjs/toolkit';
import user, { UserReducer } from './reducers/user';
import teams, { TeamsReducer } from './reducers/teams';

export const store = configureStore({
  reducer: {
    user,
    teams,
  },
});

export type RootState = {
  user: UserReducer;
  teams: TeamsReducer;
};

export type AppDispatch = typeof store.dispatch;

