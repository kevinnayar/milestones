import { configureStore } from '@reduxjs/toolkit';
import user, { UserReducer } from './reducers/user';
import team, { TeamReducer } from './reducers/team';

export const store = configureStore({
  reducer: {
    user,
    team,
  },
});

export type RootState = {
  user: UserReducer;
  team: TeamReducer;
};

export type AppDispatch = typeof store.dispatch;

