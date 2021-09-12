import { configureStore } from '@reduxjs/toolkit';
import user, { UserReducer } from './reducers/user';

export const store = configureStore({
  reducer: {
    user,
  },
});

export type RootState = {
  user: UserReducer,
};

export type AppDispatch = typeof store.dispatch;


