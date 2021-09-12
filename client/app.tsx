import * as React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { createBrowserHistory, History } from 'history';

import { useAppSelector } from './hooks/useAppSelector';
import { useTheme } from './hooks/useTheme';

import { AppHeader } from './components/AppHeader/AppHeader';
import { AppContent } from './components/AppContent/AppContent';
import { AppFooter } from './components/AppFooter/AppFooter';

import { Logo } from './components/Logo/Logo';
import { Branding } from './components/Branding/Branding';
import { MainNav } from './components/MainNav/MainNav';
import { ThemeSwitch } from './components/ThemeSwitch/ThemeSwitch';

import { AuthForm } from './components/AuthForm/AuthForm';
import { RootState } from './store/store';

const history: History<any> = createBrowserHistory();

export default function App() {
  const brand = 'milestones';
  const { theme, toggleTheme } = useTheme();
  const { auth } = useAppSelector((state: RootState) => state.user);
  const isLoggedIn = () => auth.isAuthenticated;

  console.log({ isLoggedIn: isLoggedIn() });

  console.log({history});

  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader>
          <Logo theme={theme} />
          <Branding brand={brand} />
          <MainNav />
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
        </AppHeader>

        <AppContent>
          <Switch>
            <Route path="/login" component={() => <AuthForm view="LOGIN" />} />
            <Route path="/register" component={() => <AuthForm view="REGISTER" />} />
            <Route path="/forgot-password" component={() => <AuthForm view="FORGOT_PASSWORD" />} />
          </Switch>
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


// <AppContent>
//   <div style={{ padding: 40 }}>
//     <div>
//       <div style={{ display: 'flex', margin: '40px 0' }}>
//         <button
//           style={btnStyles}
//           type="button"
//           onClick={() => dispatch(userLogin(email, password))}
//         >
//           Login
//         </button>
//         <button style={btnStyles} type="button" onClick={() => dispatch(userLogout())}>
//           Logout
//         </button>
//         <button
//           style={btnStyles}
//           type="button"
//           onClick={() => dispatch(userGetSelf(auth.userId))}
//         >
//           Get Self
//         </button>
//         <button
//           style={btnStyles}
//           type="button"
//           onClick={() => dispatch(userKeepAlive(auth.userId))}
//         >
//           Keep Alive
//         </button>
//       </div>
//     </div>
//     <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
//       <div style={divStyles}>
//         <h3>Auth</h3>
//         <pre style={{ fontSize: 14 }}>{JSON.stringify(auth, null, 2)}</pre>
//       </div>
//       <div style={divStyles}>
//         <h3>Auth Xfer</h3>
//         <pre style={{ fontSize: 14 }}>{JSON.stringify(authXfer, null, 2)}</pre>
//       </div>
//       <div style={divStyles}>
//         <h3>Self</h3>
//         <pre style={{ fontSize: 14 }}>{JSON.stringify(self, null, 2)}</pre>
//       </div>
//       <div style={divStyles}>
//         <h3>Self Xfer</h3>
//         <pre style={{ fontSize: 14 }}>{JSON.stringify(selfXfer, null, 2)}</pre>
//       </div>
//     </div>
//   </div>
// </AppContent>



