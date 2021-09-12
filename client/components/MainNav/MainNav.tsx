import * as React from 'react';
import { Link } from 'react-router-dom';
import { userLogout } from '../../store/reducers/user';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { RootState } from '../../store/store';

export const MainNav = () => {
  const { auth } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const links = auth.isAuthenticated ? (
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
      <Link onClick={() => dispatch(userLogout())} to="/login">
        <i className="material-icons">lock</i>
        <p>Logout</p>
      </Link>
    </>
  ) : (
    <>
      <Link to="/login">
        <i className="material-icons">lock</i>
        <p>Login</p>
      </Link>
      <Link to="/register">
        <i className="material-icons">person_add</i>
        <p>Signup</p>
      </Link>
    </>
  );

  return <nav className="main-nav">{links}</nav>;
};




