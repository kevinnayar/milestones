import * as React from 'react';
import { CSSProperties } from 'react';
import { BrowserRouter } from 'react-router-dom';

import type { RootState } from './store/store';
import { userLogin, userLogout, userGetSelf } from './store/reducers/user';
import { useAppSelector } from './hooks/useAppSelector';
import { useAppDispatch } from './hooks/useAppDispatch';
import { callApi } from '../shared/utils/asyncUtils';

import { AppHeader } from './components/AppHeader/AppHeader';
import { AppContent } from './components/AppContent/AppContent';
import { AppFooter } from './components/AppFooter/AppFooter';

import { Branding } from './components/Branding/Branding';
import { MainNav } from './components/MainNav/MainNav';
import { ThemeSwitch } from './components/ThemeSwitch/ThemeSwitch';
import ThemeHelper from '../shared/helpers/ThemeHelper';

const btnStyles: CSSProperties = {
  height: 48,
  background: '#1a53ff',
  padding: '0 24px',
  border: 'none',
  outline: 'none',
  color: 'white',
  fontWeight: 'bold',
  margin: '12px',
  cursor: 'pointer',
};

const divStyles: CSSProperties = {
  marginTop: 40,
  minWidth: 300,
  border: '1px solid #ddd',
  margin: '12px',
  padding: 24,
};

async function keepAlive(userId: string) {
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  };
  await callApi('http://localhost:3000/api/v1/users/keepAlive', opts);
}

export default function App() {
  const brand = 'milestones';
  const themeHelper = new ThemeHelper(window.localStorage);
  document.body.classList.add(themeHelper.getLocalTheme());

  const email = 'kevin.nayar+3@gmail.com';
  const password = 'Password1!';

  const { auth, authXfer, self, selfXfer } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

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
            <div>
              <div style={{ display: 'flex', margin: '40px 0' }}>
                <button
                  style={btnStyles}
                  type="button"
                  onClick={() => dispatch(userLogin(email, password))}
                >
                  Login
                </button>
                <button style={btnStyles} type="button" onClick={() => dispatch(userLogout())}>
                  Logout
                </button>
                <button
                  style={btnStyles}
                  type="button"
                  onClick={() => dispatch(userGetSelf(auth.userId))}
                >
                  Get Self
                </button>
                <button
                  style={btnStyles}
                  type="button"
                  onClick={() => keepAlive(auth.userId)}
                >
                  Keep Alive
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              <div style={divStyles}>
                <h3>Auth</h3>
                <pre style={{ fontSize: 14 }}>{JSON.stringify(auth, null, 2)}</pre>
              </div>
              <div style={divStyles}>
                <h3>Auth Xfer</h3>
                <pre style={{ fontSize: 14 }}>{JSON.stringify(authXfer, null, 2)}</pre>
              </div>
              <div style={divStyles}>
                <h3>Self</h3>
                <pre style={{ fontSize: 14 }}>{JSON.stringify(self, null, 2)}</pre>
              </div>
              <div style={divStyles}>
                <h3>Self Xfer</h3>
                <pre style={{ fontSize: 14 }}>{JSON.stringify(selfXfer, null, 2)}</pre>
              </div>
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
