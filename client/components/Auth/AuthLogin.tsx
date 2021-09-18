import * as React from 'react';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { userLogin, userGetSelf } from '../../store/reducers/user';
import { isValidEmailOrThrow } from '../../../shared/utils/typeUtils';
import { formatError } from '../../../shared/utils/baseUtils';
import { hasFetchNotStarted, hasFetchSucceeded } from '../../../shared/utils/asyncUtils';
import { RootState } from '../../store/store';

export const AuthLogin = (props: RouteComponentProps) => {
  const { auth, self, loginRedirectPath } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const [apiError, setApiError] = useState<null | string>(null);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<null | string>(null);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<null | string>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    switch (evt.currentTarget.name) {
      case 'email': {
        setEmail(evt.currentTarget.value);
        try {
          isValidEmailOrThrow(evt.currentTarget.value, 'Email is invalid');
          setEmailError(null);
        } catch (e) {
          setEmailError(formatError(e));
        }
        break;
      }
      case 'password': {
        setPassword(evt.currentTarget.value);
        try {
          setPasswordError(null);
        } catch (e) {
          setPasswordError(formatError(e));
        }
        break;
      }
      default: {
        setApiError(`Invalid field: ${evt.currentTarget.name || 'null'}`);
      }
    }
  };

  const handleLogin = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (email && password) {
      dispatch(userLogin({ email, password }));
    }
  };

  useEffect(() => {
    if (
      auth &&
      auth.data &&
      auth.data.isAuthenticated &&
      auth.data.tokenExpiration < DateTime.now().toMillis()
    ) {
      props.history.push(loginRedirectPath);
    }
  }, [props.history, auth, loginRedirectPath]);

  useEffect(() => { if (auth.error) setApiError(auth.error); }, [auth.error]);

  useEffect(() => { if (self.error) setApiError(self.error); }, [self.error]);

  useEffect(() => {
    if (
      hasFetchSucceeded(auth) && hasFetchNotStarted(self) &&
      auth.data && auth.data.token
    ) {
      dispatch(userGetSelf(auth.data.token));
    }
  }, [dispatch, auth, self]);

  useEffect(() => {
    if (hasFetchSucceeded(self)) props.history.push(loginRedirectPath);
  }, [props.history, self, loginRedirectPath]);

  const canSubmit = Boolean(!emailError && !passwordError && email && password);

  return (
    <div className="form--login">
      {apiError && <p className="auth-page__error">{apiError}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input value={email} name="email" onChange={handleChange} />
          {emailError && <p className="auth-page__error">{emailError}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input value={password} name="password" type="password" onChange={handleChange} />
          {passwordError && <p className="auth-page__error">{passwordError}</p>}
        </div>
        <div>
          <button type="submit" className={canSubmit ? 'btn' : 'btn btn--disabled'}>
            Login
          </button>
        </div>
        <Link className="auth-page__switch-link" to="" onClick={(evt: any) => evt.preventDefault()}>
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

// function ForgotPassword(props: ViewProps) {
//   const dispatch = useDispatch();
//   const { authPasswordResetSendXferStatus } = useSelector((state: AppReducer) => state.auth);

//   const [error, setError] = useState<null | string>(null);
//   const [canSubmit, setCanSubmit] = useState(false);

//   const handleLogin = async (evt: React.FormEvent<HTMLFormElement>) => {
//     evt.preventDefault();

//     try {
//       if (props.email) {
//         setError(null);
//         dispatch(authSendPasswordResetEmail(props.email));
//       }
//     } catch (e) {
//       setError(extractError(e));
//     }
//   };

//   useEffect(() => {
//     if (authPasswordResetSendXferStatus.failed) {
//       setError(extractError(authPasswordResetSendXferStatus.error));
//     }
//   }, [authPasswordResetSendXferStatus]);

//   useEffect(() => {
//     const valid = props.email && validateEmail(props.email);
//     setCanSubmit(valid);
//   }, [props.email]);

//   if (authPasswordResetSendXferStatus.succeeded) {
//     return (
//       <div className="form--login">
//         <div>
//           <p>
//             Email sent to <strong>{props.email}</strong>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="form--login">
//       {error && <p className="auth-page__error">{error}</p>}

//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             value={props.email}
//             name="email"
//             onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
//               evt.preventDefault();
//               props.setEmail(evt.currentTarget.value);
//             }}
//           />
//         </div>
//         <div>
//           <button className={canSubmit ? 'btn' : 'btn btn--disabled'}>Reset Password</button>
//         </div>
//         <Link
//           className="auth-page__switch-link"
//           to=""
//           onClick={(evt: any) => {
//             evt.preventDefault();
//             props.setView('LOGIN');
//           }}
//         >
//           Back to Login
//         </Link>
//       </form>
//     </div>
//   );
// }



