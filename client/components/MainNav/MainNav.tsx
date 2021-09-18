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
      <NavLink to="/tracks">
        <i className="material-icons">insights</i>
        <p>Tracks</p>
      </NavLink>
      <NavLink to="/configure">
        <i className="material-icons">tune</i>
        <p>Configure</p>
      </NavLink>
      <Link onClick={() => dispatch(userLogout())} to="/login">
        <i className="material-icons">lock</i>
        <p>Logout</p>
      </Link>
    </>
  ) : (
    <>
      <NavLink to="/login">
        <i className="material-icons">lock</i>
        <p>Login</p>
      </NavLink>
      <NavLink to="/register">
        <i className="material-icons">person_add</i>
        <p>Signup</p>
      </NavLink>
    </>
  );

  return <nav className="main-nav">{links}</nav>;
};




