import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AuthPageTemplate } from '../../templates/AuthPageTemplate';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { userRegister, userGetSelf } from '../../store/reducers/user';
import { isValidEmailOrThrow, isValidPasswordOrThrow } from '../../../common/utils/typeUtils';
import { hasFetchNotStarted, hasFetchSucceeded } from '../../../common/utils/asyncUtils';
import { UserCreateParams } from '../../../common/types/entityTypes';
import { RootState } from '../../store/store';



export const AuthRegisterPage = (props: RouteComponentProps) => {
  const { auth, self, loginRedirectPath } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const [error, setError] = useState<null | string>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [fullName, setFullName] = useState('');

  const [errorTracker, setErrorTracker] = useState({
    email: false,
    password: false,
    displayName: false,
    fullName: false,
  });

  const canSubmit = Boolean(
    email &&
      password &&
      displayName &&
      fullName &&
      Object.values(errorTracker).every((v) => v === false),
  );

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (canSubmit) {
      const params: UserCreateParams = {
        roleId: 'role_owner',
        displayName,
        fullName,
        email,
        password,
      };
      dispatch(userRegister(params));
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

  const validateText = (value: string, label: string) => {
    if (!value) throw new Error(`${label} is required`);
  };

  const updateErrorTracker = (
    input: 'email' | 'password' | 'fullName' | 'lastName' | 'displayName',
    hasError: boolean,
  ) => {
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

  return (
    <AuthPageTemplate>
      <div className="form--auth">
        {error && <p className="auth-page__error">{error}</p>}

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
            required
            type="password"
            value={password}
            setValue={setPassword}
            validateOrThrow={validatePassword}
            setHasError={(hasError: boolean) => updateErrorTracker('password', hasError)}
          />
          <Input
            name="displayName"
            label="Display Name"
            required
            value={displayName}
            setValue={setDisplayName}
            validateOrThrow={(v: string) => validateText(v, 'Display name')}
            setHasError={(hasError: boolean) => updateErrorTracker('displayName', hasError)}
          />
          <Input
            name="fullName"
            label="Full Name"
            required
            value={fullName}
            setValue={setFullName}
            validateOrThrow={(v: string) => validateText(v, 'First name')}
            setHasError={(hasError: boolean) => updateErrorTracker('fullName', hasError)}
          />
          <div>
            <Button type="submit" disabled={!canSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </AuthPageTemplate>
  );
};


