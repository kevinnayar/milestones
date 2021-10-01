import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { publicRouteMap, privateRouteMap, PrivateRoute } from './routes';

export default function App() {
  return (
    <Router>
      <Redirect exact from="/" to="/login" />
      <Switch>
        {Object.entries(publicRouteMap).map(([path, component]) => (
          <Route key={path} path={path} exact component={component} />
        ))}
        {Object.entries(privateRouteMap).map(([path, component]) => (
          <PrivateRoute key={path} path={path} exact component={component} />
        ))}
      </Switch>
    </Router>
  );
}



