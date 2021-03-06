import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AuthPageTemplate } from '../../templates/AuthPageTemplate';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { userLogin, userGetSelf } from '../../store/reducers/user';
import { isValidEmailOrThrow, isValidPasswordOrThrow } from '../../../common/utils/typeUtils';
import { hasFetchNotStarted, hasFetchSucceeded } from '../../../common/utils/asyncUtils';
import { RootState } from '../../store/store';

export const AuthLoginPage = (props: RouteComponentProps) => {
  const { auth, self, loginRedirectPath } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const [error, setError] = useState<null | string>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorTracker, setErrorTracker] = useState({
    email: false,
    password: false,
  });

  const canSubmit = Boolean(
    email && password && Object.values(errorTracker).every((v) => v === false),
  );

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (canSubmit) {
      dispatch(userLogin({ email, password }));
    }
  };

  const validateEmail = (value: string) => {
    if (!value) throw new Error('Email is required');
    isValidEmailOrThrow(value, 'Email is in an invalid format');
  };

  const validatePassword = (value: string) => {
    if (!value) throw new Error('Password is required');
    isValidPasswordOrThrow(value);
  };

  const updateErrorTracker = (input: 'email' | 'password', hasError: boolean) => {
    setErrorTracker({
      ...errorTracker,
      [input]: hasError,
    });
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

  useEffect(() => { if (auth.error) setError(auth.error); }, [auth.error]);

  useEffect(() => { if (self.error) setError(self.error); }, [self.error]);

  useEffect(() => {
    if (hasFetchSucceeded(auth) && hasFetchNotStarted(self)) {
      dispatch(userGetSelf());
    }
  }, [dispatch, auth, self]);

  useEffect(() => {
    if (hasFetchSucceeded(self)) props.history.push(loginRedirectPath);
  }, [props.history, self, loginRedirectPath]);


  return (
    <AuthPageTemplate>
      <div className="page--auth__form">
        {error && <p className="page--auth__error">{error}</p>}

        <form onSubmit={onSubmit}>
          <Input
            name="email"
            label="Email"
            required
            value={email}
            setValue={setEmail}
            validateOrThrow={validateEmail}
            setHasError={(hasError: boolean) => updateErrorTracker('email', hasError)}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            required
            value={password}
            setValue={setPassword}
            validateOrThrow={validatePassword}
            setHasError={(hasError: boolean) => updateErrorTracker('password', hasError)}
          />
          <div>
            <Button type="submit" disabled={!canSubmit}>
              Submit
            </Button>
          </div>
          {/* <Link className="page--auth__switch-link" to="" onClick={(evt: any) => evt.preventDefault()}>
            Forgot Password?
          </Link> */}
        </form>
      </div>
    </AuthPageTemplate>
  );
};

// function ForgotPassword(props: ViewProps) {
//   const dispatch = useDispatch();
//   const { authPasswordResetSendXferStatus } = useSelector((state: AppReducer) => state.auth);

//   const [error, setError] = useState<null | string>(null);
//   const [canSubmit, setCanSubmit] = useState(false);

//   const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
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

//       <form onSubmit={onSubmit}>
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




