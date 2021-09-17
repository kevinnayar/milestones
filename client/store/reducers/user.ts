/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../clientConfig';
import {
  fetchInit,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  callApi,
} from '../../../shared/utils/asyncUtils';
import { UserAuthResponse, UserNoPII } from '../../../shared/types/entityTypes';
import { FetchState } from '../../../shared/types/baseTypes';

export type UserReducer = {
  auth: FetchState<null | UserAuthResponse>;
  self: FetchState<null | UserNoPII>;
  loginRedirectPath: string;
};

const initialState: UserReducer = {
  auth: fetchInit(),
  self: fetchInit(),
  loginRedirectPath: '/dashboard',
};

type LoginCredentials = {
  email: string;
  password: string;
};

export const userLogin = createAsyncThunk<UserAuthResponse, LoginCredentials>(
  'user/login',
  async (body: LoginCredentials) => {
    const opts = {
      method: 'POST',
      body: JSON.stringify(body),
    };
    const user: UserAuthResponse = await callApi(`${config.api.baseUrl}/api/v1/users/login`, opts);
    return user;
  },
);

type AuthCredentials = {
  userId: string;
  token: string;
};

export const userGetSelf = createAsyncThunk<UserNoPII, AuthCredentials>(
  'user/getSelf',
  async ({ userId, token }) => {
    console.log({ userId, token });
    const opts = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId }),
    };
    const self: UserNoPII = await callApi(`${config.api.baseUrl}/api/v1/users/self`, opts);
    return self;
  },
);

export const userLogout = createAsyncThunk(
  'user/logout',
  async () => {
    await callApi(`${config.api.baseUrl}/api/v1/users/logout`);
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
      .addCase(userLogin.fulfilled, (state, action) => {
        state.auth = fetchSuccess(action.payload);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.auth = fetchFailure(action.error.message);
      })
      // getSelf
      .addCase(userGetSelf.pending, (state) => {
        state.self = fetchRequest();
      })
      .addCase(userGetSelf.fulfilled, (state, action) => {
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
      });
  },
});

export const { setLoginRedirectPath } = userSlice.actions;

export default userSlice.reducer;



// export const userKeepAlive = (userId: null | string) => async (dispatch: AppDispatch, getState: () => RootState) => {
//   try {
//     if (!userId) throw new Error('No user ID provided');

//     const state = getState();
//     if (state.user.auth.userId !== userId) throw new Error('Incorrect user ID');

//     const requested = xferRequest();
//     dispatch(setUserAuthXfer(requested));

//     const opts = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ userId }),
//     };
//     await callApi(`${config.api.baseUrl}/api/v1/users/keep-alive`, opts);

//     const succeeded = xferSuccess();
//     dispatch(setUserAuthXfer(succeeded));
//   } catch (e) {
//     const error = formatError(e);
//     const failed = xferFailure(error);
//     dispatch(setUserAuthXfer(failed));
//   }
// };

// export const userRegister = (params: UserCreateParams) => async (dispatch: AppDispatch) => {
//   try {
//     const requested = xferRequest();
//     dispatch(setUserAuthXfer(requested));

//     const opts = {
//       method: 'POST',
//       body: JSON.stringify(params),
//     };
//     const user: UserAuthResponse = await callApi(`${config.api.baseUrl}/api/v1/users/register`, opts);
//     dispatch(setUserAuth(user));

//     const succeeded = xferSuccess();
//     dispatch(setUserAuthXfer(succeeded));
//   } catch (e) {
//     const error = formatError(e);
//     const failed = xferFailure(error);
//     dispatch(setUserAuthXfer(failed));
//   }
// };


