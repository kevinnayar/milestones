import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './app';
import config from '../shared/config/clientConfig';
import './assets/styles/main.scss';

ReactDOM.render(
  <Auth0Provider
    domain={config.auth.domain}
    clientId={config.auth.clientId}
    redirectUri={window.location.origin}
    audience={config.auth.audience}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);
