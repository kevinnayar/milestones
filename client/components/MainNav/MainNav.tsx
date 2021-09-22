import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { userLogout } from '../../store/reducers/user';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { RootState } from '../../store/store';

export const MainNav = () => {
  const { auth } = useAppSelector((state: RootState) => state.user);
  const isAuthenticated = auth.data ? auth.data.isAuthenticated : false;
  const dispatch = useAppDispatch();

  const links = isAuthenticated ? (
    <>
      <NavLink to="/teams">
        <i className="material-icons">groups</i>
        <p>Teams</p>
      </NavLink>
      <Link onClick={() => dispatch(userLogout())} to="/login">
        <i className="material-icons">lock</i>
        <p>Logout</p>
      </Link>
    </>
  ) : (
    <>
      <NavLink to="/login">
        <p>Login</p>
      </NavLink>
      <NavLink to="/register">
        <p>Signup</p>
      </NavLink>
    </>
  );

  return <nav className="main-nav">{links}</nav>;
};




