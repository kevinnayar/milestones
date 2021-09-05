import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../hooks/useApi';
import config from '../../shared/config/clientConfig';

export const Profile = () => {
  const opts = {
    audience: config.auth.audience,
  };

  const { loginWithRedirect, getAccessTokenWithPopup } = useAuth0();
  const url = `${config.api.baseUrl}/api/v1/users/me`;

  const { loading, error, refresh, data: users } = useApi(url, opts);
  const getTokenAndTryAgain = async () => {
    await getAccessTokenWithPopup(opts);
    refresh();
  };

  console.log({ users });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error.error === 'login_required') {
      return <button type="button" onClick={() => loginWithRedirect(opts)}>Login</button>;
    }

    if (error.error === 'consent_required') {
      return <button type="button" onClick={getTokenAndTryAgain}>Consent to reading users</button>;
    }

    return <div>Oops {error.message}</div>;
  }

  return <div />;
};
