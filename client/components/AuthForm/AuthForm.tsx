import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { userLogin, userRegister } from '../../store/reducers/user';
import { isValidEmailOrThrow } from '../../../shared/utils/typeUtils';
import { formatError } from '../../../shared/utils/baseUtils';
import { RootState } from '../../store/store';
import { UserCreateParams } from '../../../shared/types/entityTypes';

type ViewState = 'LOGIN' | 'FORGOT_PASSWORD' | 'REGISTER';

type ViewProps = {
  email: string;
  setEmail: (_email: string) => void;
  view: ViewState,
  setView: (_view: ViewState) => void;
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
//       {error && <p className="auth-form__error">{error}</p>}

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
//           className="auth-form__switch-link"
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

const ForgotPassword = (props: ViewProps) => <div />;

function Login(props: ViewProps) {
  const { authXfer } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>(null);
  const [passwordError, setPasswordError] = useState<null | string>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    switch (evt.currentTarget.name) {
      case 'email': {
        props.setEmail(evt.currentTarget.value);
        try {
          isValidEmailOrThrow(evt.currentTarget.value, 'Email is invalid');
          setPasswordError(null);
        } catch (e) {
          setPasswordError(formatError(e));
        }
        break;
      }
      case 'password': {
        setPassword(evt.currentTarget.value);
        try {
          isValidEmailOrThrow(evt.currentTarget.value, 'Email is invalid');
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

    try {
      if (props.email && password) {
        dispatch(userLogin(props.email, password));
      }
    } catch (e) {
      setApiError(formatError(e));
    }
  };

  // useEffect(() => {
  //   if (authXfer.failed) {
  //     setError(formatError(authXfer.error));
  //   }
  // }, [authXfer]);

  // useEffect(() => {
  //   try {
  //     if (!props.email) {
  //       throw new Error('Email is required');
  //     }
  //     if (props.email) {
  //       isValidEmailOrThrow(props.email, 'Email is in an invalid format');
  //     }
  //     if (!password.length) {
  //       throw new Error('Password is required');
  //     }
  //     setCanSubmit(true);
  //   } catch (e) {
  //     setError(formatError(e));
  //   }
  // }, [props.email, password]);

  return (
    <div className="form--login">
      {/* {error && <p className="auth-form__error">{error}</p>} */}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={props.email}
            name="email"
            onChange={(evt: any) => {
              evt.preventDefault();
              props.setEmail(evt.currentTarget.value);
            }}
          />
          {emailError && <p className="auth-form__error">{emailError}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input value={password} name="password" type="password" onChange={handleChange} />
        </div>
        <div>
          <button type="submit" className={canSubmit ? 'btn' : 'btn btn--disabled'}>
            Login
          </button>
        </div>
        <Link
          className="auth-form__switch-link"
          to=""
          onClick={(evt: any) => {
            evt.preventDefault();
            props.setView('FORGOT_PASSWORD');
          }}
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}

function Register(props: ViewProps) {
  const { authXfer } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<null | string>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    switch (evt.currentTarget.name) {
      case 'firstName': {
        setFirstName(evt.currentTarget.value);
        break;
      }
      case 'lastName': {
        setLastName(evt.currentTarget.value);
        break;
      }
      case 'displayName': {
        setDisplayName(evt.currentTarget.value);
        break;
      }
      case 'email': {
        props.setEmail(evt.currentTarget.value);
        break;
      }
      case 'password': {
        setPassword(evt.currentTarget.value);
        break;
      }
      default: {
        setError(`Invalid field: ${evt.currentTarget.name || 'null'}`);
      }
    }
  };

  const handleSignup = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      if (firstName && lastName && displayName && props.email && password) {
        setError(null);
        const params: UserCreateParams = {
          roleId: 'role_owner',
          displayName,
          firstName,
          lastName,
          email: props.email,
          password,
        };
        dispatch(userRegister(params));
      }
    } catch (e) {
      setError(formatError(e));
    }
  };

  useEffect(() => {
    if (authXfer.failed) {
      setError(formatError(authXfer.error));
    }
  }, [authXfer]);

  // useEffect(() => {
  //   const valid =
  //     fullName &&
  //     displayName &&
  //     email &&
  //     password &&
  //     validateEmail(email) &&
  //     validatePassword(password);
  //   setCanSubmit(valid);
  // }, [fullName, displayName, email, password]);

  return (
    <div className="form--signup">
      {error && <p className="auth-form__error">{error}</p>}

      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input value={firstName} name="firstName" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input value={lastName} name="lastName" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="displayName">Display Name</label>
          <input value={displayName} name="displayName" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input value={props.email} name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input value={password} name="password" type="password" onChange={handleChange} />
        </div>
        <div>
          <button type="submit" className={canSubmit ? 'btn' : 'btn btn--disabled'}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}
// props: { view: ViewState }
export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [view, setView] = useState<ViewState>('LOGIN');

  const nestedProps: ViewProps = {
    email,
    setEmail,
    view,
    setView,
  };

  return (
    <div className="auth-form">
      <div className="auth-form__nav-links">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Signup</NavLink>
      </div>
      {view === 'LOGIN' && <Login {...nestedProps} />}
      {view === 'FORGOT_PASSWORD' && <ForgotPassword {...nestedProps} />}
      {view === 'REGISTER' && <Register {...nestedProps} />}
    </div>
  );
};



