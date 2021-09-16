import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const AuthLinks = () => {
  return (
    <div className="auth-page__nav-links">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Signup</NavLink>
    </div>
  );
};
