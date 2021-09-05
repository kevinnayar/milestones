import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type ApiOpts = RequestInit & {
  audience?: string;
  scope?: string;
};

type UseApiResult<T> = {
  error: any,
  loading: boolean,
  data: null | T,
};

export function useApi<T>(url: string, opts: ApiOpts) {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<UseApiResult<T>>({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { audience, scope, ...fetchOptions } = opts;

        const accessToken = await getAccessTokenSilently({ audience, scope });

        const res = await fetch(url, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setState({
          ...state,
          data: await res.json() as T,
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
}



