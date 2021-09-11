import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import config from './clientConfig';
import { callApi } from '../shared/utils/asyncUtils';

import { AppHeader } from './components/AppHeader/AppHeader';
import { AppContent } from './components/AppContent/AppContent';
import { AppFooter } from './components/AppFooter/AppFooter';

import { Branding } from './components/Branding/Branding';
import { MainNav } from './components/MainNav/MainNav';
import { ThemeSwitch } from './components/ThemeSwitch/ThemeSwitch';
import ThemeHelper from '../shared/helpers/ThemeHelper';
import { UserAuthResponse } from '../shared/types/entityTypes';
import { formatError } from '../shared/utils/baseUtils';

async function login(
  email: string,
  password: string,
  setUser: (_u: UserAuthResponse) => void,
  setError: (_e: null | string) => void,
) {
  try {
    setError(null);
    const body = { email, password };
    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    const user: UserAuthResponse = await callApi(`${config.api.baseUrl}/api/v1/users/login`, opts);
    setUser(user);
  } catch (e) {
    console.log(e);
    setError(formatError(e));
  }
}

async function logout(
  setUser: (_u: UserAuthResponse) => void,
  setError: (_e: null | string) => void,
) {
  try {
    setError(null);
    const user: UserAuthResponse = await callApi(`${config.api.baseUrl}/api/v1/users/logout`);
    setUser(user);
  } catch (e) {
    console.log(e);
    setError(formatError(e));
  }
}

export default function App() {
  const brand = 'milestones';
  const themeHelper = new ThemeHelper(window.localStorage);
  document.body.classList.add(themeHelper.getLocalTheme());

  const [email, setEmail] = useState('kevin.nayar+3@gmail.com');
  const [password, setPassword] = useState('Password1!');

  const [user, setUser] = useState<UserAuthResponse>({
    isAuthenticated: false,
    userId: null,
    token: null,
    rightIds: null,
  });
  const [error, setError] = useState<null | string>(null);

  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader>
          <Branding brand={brand} />
          <MainNav />
          <ThemeSwitch themeHelper={themeHelper} />
        </AppHeader>

        <AppContent>
          <div style={{ padding: 40 }}>
            <h1>Account</h1>
            <div>
              <div>
                <label htmlFor="login-email">email</label>
                <input
                  type="text"
                  name="login-email"
                  id="login-email"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
              <div>
                <label htmlFor="login-password">password</label>
                <input
                  type="password"
                  name="login-password"
                  id="login-password"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </div>
              <button type="button" onClick={() => login(email, password, setUser, setError)}>
                Login
              </button>
              <button type="button" onClick={() => logout(setUser, setError)}>
                Logout
              </button>
            </div>
            <div style={{ marginTop: 40 }}>
              <h2>User</h2>
              <pre style={{ fontSize: 14 }}>{JSON.stringify(user, null, 2)}</pre>
            </div>
            <div style={{ marginTop: 40 }}>
              <h2>Error</h2>
              <pre style={{ fontSize: 14 }}>{error || 'null'}</pre>
            </div>
          </div>
        </AppContent>

        <AppFooter>
          <p>
            &copy; <span>{brand}</span> {new Date().getFullYear()}, All Rights Reserved.
          </p>
        </AppFooter>
      </div>
    </BrowserRouter>
  );
}
