import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const MainNav = React.memo(() => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const links = user ? (
    <>
      <Link to="/dashboard">
        <i className="material-icons">dashboard</i>
        <p>Dashboard</p>
      </Link>
      <Link to="/configure">
        <i className="material-icons">tune</i>
        <p>Configure</p>
      </Link>
      <Link to="/account">
        <i className="material-icons">person</i>
        <p>Account</p>
      </Link>
      <Link onClick={() => logout()} to="">
        <i className="material-icons">lock</i>
        <p>Logout</p>
      </Link>
    </>
  ) : (
    <>
      <Link onClick={loginWithRedirect} to="">
        <i className="material-icons">lock</i>
        <p>Login</p>
      </Link>
    </>
  );

  return <nav className="main-nav">{links}</nav>;
});

