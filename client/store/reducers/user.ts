/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../shared/helpers/ApiClient';
import {
  fetchInit,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
} from '../../../shared/utils/asyncUtils';
import { UserAuthResponse, UserNoPII, UserCreateParams } from '../../../shared/types/entityTypes';
import { FetchState } from '../../../shared/types/baseTypes';

export type UserReducer = {
  auth: FetchState<null | UserAuthResponse>;
  self: FetchState<null | UserNoPII>;
  loginRedirectPath: string;
};

const initialState: UserReducer = {
  auth: fetchInit(),
  self: fetchInit(),
  loginRedirectPath: '/teams',
};

type LoginCredentials = {
  email: string;
  password: string;
};

export const userLogin = createAsyncThunk<UserAuthResponse, LoginCredentials>(
  'user/login',
  async (body: LoginCredentials) => {
    const user: UserAuthResponse = await apiClient.post('/users/login', { body });
    return user;
  },
);

export const userRegister = createAsyncThunk<UserAuthResponse, LoginCredentials>(
  'user/register',
  async (body: UserCreateParams) => {
    const user: UserAuthResponse = await apiClient.post('/users/register', { body });
    return user;
  },
);

export const userGetSelf = createAsyncThunk<UserNoPII, string>(
  'user/getSelf',
  async (token: string) => {
    const self: UserNoPII = await apiClient.post('/users/self', { token });
    return self;
  },
);

export const userLogout = createAsyncThunk(
  'user/logout',
  async () => {
    await apiClient.get('/users/logout');
  },
);

export const userRefreshToken = createAsyncThunk<UserAuthResponse>(
  'user/refreshToken',
  async () => {
    const user: UserAuthResponse = await apiClient.post('/users/refresh-token', {});
    return user;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginRedirectPath: (state, action: PayloadAction<string>) => {
      state.loginRedirectPath = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(userLogin.pending, (state) => {
        state.auth = fetchRequest();
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<UserAuthResponse>) => {
        state.auth = fetchSuccess(action.payload);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.auth = fetchFailure(action.error.message);
      })

      // register
      .addCase(userRegister.pending, (state) => {
        state.auth = fetchRequest();
      })
      .addCase(userRegister.fulfilled, (state, action: PayloadAction<UserAuthResponse>) => {
        state.auth = fetchSuccess(action.payload);
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.auth = fetchFailure(action.error.message);
      })

      // getSelf
      .addCase(userGetSelf.pending, (state) => {
        state.self = fetchRequest();
      })
      .addCase(userGetSelf.fulfilled, (state, action: PayloadAction<UserNoPII>) => {
        state.self = fetchSuccess(action.payload);
      })
      .addCase(userGetSelf.rejected, (state, action) => {
        state.self = fetchFailure(action.error.message);
      })

      // logout
      .addCase(userLogout.pending, (state) => {
        state.auth = fetchRequest();
        state.self = fetchRequest();
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.auth = fetchSuccess(null);
        state.self = fetchSuccess(null);
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.auth = fetchFailure(action.error.message);
        state.self = fetchFailure(action.error.message);
      })

      // refreshToken
      .addCase(userRefreshToken.pending, (state) => {
        state.auth = fetchRequest();
      })
      .addCase(userRefreshToken.fulfilled, (state, action: PayloadAction<UserAuthResponse>) => {
        state.auth = fetchSuccess(action.payload);
      })
      .addCase(userRefreshToken.rejected, (state, action) => {
        state.auth = fetchFailure(action.error.message);
      });
  },
});

export const { setLoginRedirectPath } = userSlice.actions;

export default userSlice.reducer;

