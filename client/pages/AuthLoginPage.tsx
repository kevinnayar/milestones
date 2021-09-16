import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AuthLinks } from '../components/Auth/AuthLinks';
import { AuthLogin } from '../components/Auth/AuthLogin';

export const AuthLoginPage = (props: RouteComponentProps) => {
  return (
    <div className="auth-page auth-page--login">
      <AuthLinks />
      <AuthLogin {...props} />
    </div>
  );
};
