/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../store';

import config from '../../clientConfig';
import { xferInit, xferRequest, xferSuccess, xferFailure, callApi } from '../../../shared/utils/asyncUtils';
import { formatError } from '../../../shared/utils/baseUtils';
import { RootState } from '../store';
import { UserAuthResponse, UserCreateParams, UserNoPII } from '../../../shared/types/entityTypes';
import { ApiTransferStatus } from '../../../shared/types/baseTypes';

export type UserReducer = {
  authXfer: ApiTransferStatus;
  auth: UserAuthResponse;
  selfXfer: ApiTransferStatus;
  self: null | UserNoPII;
  loginRedirectPath: string;
};

const unauthed: UserAuthResponse = {
  isAuthenticated: false,
  userId: null,
  token: null,
  tokenExpiration: null,
};

const initialState: UserReducer = {
  authXfer: xferInit(),
  auth: unauthed,
  selfXfer: xferInit(),
  self: null,
  loginRedirectPath: '/dashboard',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuthXfer: (state, action: PayloadAction<ApiTransferStatus>) => {
      state.authXfer = action.payload;
    },
    setUserAuth: (state, action: PayloadAction<UserAuthResponse>) => {
      state.auth = action.payload;
    },
    setUserSelfXfer: (state, action: PayloadAction<ApiTransferStatus>) => {
      state.selfXfer = action.payload;
    },
    setUserSelf: (state, action: PayloadAction<null | UserNoPII>) => {
      state.self = action.payload;
    },
    setLoginRedirectPath: (state, action: PayloadAction<string>) => {
      state.loginRedirectPath = action.payload;
    },
  },
});

export const {
  setUserAuthXfer,
  setUserAuth,
  setLoginRedirectPath,
  setUserSelfXfer,
  setUserSelf,
} = userSlice.actions;

export const userLogin = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const requested = xferRequest();
    dispatch(setUserAuthXfer(requested));

    const body = { email, password };
    const opts = {
      method: 'POST',
      body: JSON.stringify(body),
    };
    const user: UserAuthResponse = await callApi(`${config.api.baseUrl}/api/v1/users/login`, opts);
    dispatch(setUserAuth(user));

    const succeeded = xferSuccess();
    dispatch(setUserAuthXfer(succeeded));
  } catch (e) {
    const error = formatError(e);
    const failed = xferFailure(error);
    dispatch(setUserAuthXfer(failed));
  }
};

export const userLogout = () => async (dispatch: AppDispatch) => {
  try {
    const requested = xferRequest();
    dispatch(setUserAuthXfer(requested));
    dispatch(setUserSelfXfer(requested));

    const user: UserAuthResponse = await callApi(`${config.api.baseUrl}/api/v1/users/logout`);
    dispatch(setUserAuth(user));
    dispatch(setUserSelf(null));

    const succeeded = xferSuccess();
    dispatch(setUserAuthXfer(succeeded));
    dispatch(setUserSelfXfer(succeeded));
  } catch (e) {
    const error = formatError(e);
    const failed = xferFailure(error);
    dispatch(setUserAuthXfer(failed));
    dispatch(setUserSelfXfer(failed));
  }
};

export const userGetSelf = (userId: null | string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    console.log('get self init');
    if (!userId) throw new Error('No user ID provided');

    const state = getState();
    if (state.user.auth.userId !== userId) throw new Error('Incorrect user ID');

    const token = state.user.auth.token;
    if (!token) throw new Error('No token found');

    const requested = xferRequest();
    dispatch(setUserSelfXfer(requested));

    const opts = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId }),
    };
    const self: UserNoPII = await callApi(`${config.api.baseUrl}/api/v1/users/self`, opts);
    dispatch(setUserSelf(self));

    const succeeded = xferSuccess();
    dispatch(setUserSelfXfer(succeeded));
  } catch (e) {
    const error = formatError(e);
    const failed = xferFailure(error);
    dispatch(setUserSelfXfer(failed));
  }
};

export const userKeepAlive = (userId: null | string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    if (!userId) throw new Error('No user ID provided');

    const state = getState();
    if (state.user.auth.userId !== userId) throw new Error('Incorrect user ID');

    const requested = xferRequest();
    dispatch(setUserAuthXfer(requested));

    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    };
    await callApi(`${config.api.baseUrl}/api/v1/users/keep-alive`, opts);

    const succeeded = xferSuccess();
    dispatch(setUserAuthXfer(succeeded));
  } catch (e) {
    const error = formatError(e);
    const failed = xferFailure(error);
    dispatch(setUserAuthXfer(failed));
  }
};

export const userRegister = (params: UserCreateParams) => async (dispatch: AppDispatch) => {
  try {
    const requested = xferRequest();
    dispatch(setUserAuthXfer(requested));

    const opts = {
      method: 'POST',
      body: JSON.stringify(params),
    };
    const user: UserAuthResponse = await callApi(`${config.api.baseUrl}/api/v1/users/register`, opts);
    dispatch(setUserAuth(user));

    const succeeded = xferSuccess();
    dispatch(setUserAuthXfer(succeeded));
  } catch (e) {
    const error = formatError(e);
    const failed = xferFailure(error);
    dispatch(setUserAuthXfer(failed));
  }
};

export default userSlice.reducer;
