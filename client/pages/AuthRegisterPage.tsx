import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AuthLinks } from '../components/Auth/AuthLinks';
import { AuthRegister } from '../components/Auth/AuthRegister';

export const AuthRegisterPage = (props: RouteComponentProps) => {
  return (
    <div className="auth-page auth-page--register">
      <AuthLinks />
      <AuthRegister {...props} />
    </div>
  );
};
