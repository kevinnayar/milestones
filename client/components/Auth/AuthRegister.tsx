import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { userRegister } from '../../store/reducers/user';
import { formatError } from '../../../shared/utils/baseUtils';
import { RootState } from '../../store/store';

export const AuthRegister = (props: RouteComponentProps) => {
  const { auth, authXfer, loginRedirectPath } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const [apiError, setApiError] = useState<null | string>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');

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
        setEmail(evt.currentTarget.value);
        break;
      }
      case 'password': {
        setPassword(evt.currentTarget.value);
        break;
      }
      default: {
        setApiError(`Invalid field: ${evt.currentTarget.name || 'null'}`);
      }
    }
  };

  const handleSignup = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      if (firstName && lastName && displayName && email && password) {
        setApiError(null);
        const params = {
          roleId: 'role_owner',
          displayName,
          firstName,
          lastName,
          email,
          password,
        };
        dispatch(userRegister(params));
      }
    } catch (e) {
      setApiError(formatError(e));
    }
  };

  useEffect(() => {
    if (authXfer.failed) {
      setApiError(formatError(authXfer.error));
    }
  }, [authXfer]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const path = loginRedirectPath;
      props.history.push(path);
    }
  }, [props.history, auth, loginRedirectPath]);

  const canSubmit = Boolean(!apiError && email && password && firstName && lastName && displayName);

  return (
    <div className="form--signup">
      {apiError && <p className="auth-page__error">{apiError}</p>}

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
          <input value={email} name="email" onChange={handleChange} />
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
};



