import { useState, useEffect } from 'react';

export type UseFetchResult<T> = {
  isLoading: boolean;
  data: null | T;
  error: null | Error;
  refetch: (_url: string) => Promise<void>;
};

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    error: null,
  });

  async function fetchData(urlIn: string) {
    setState({
      ...state,
      isLoading: true,
    });

    try {
      const res = await fetch(urlIn);
      const data = await res.json();

      if (!res.ok) {
        const message = data && data.message ? data.message : 'Wasn\'t able to load data.';
        throw new Error(message);
      } else {
        setState({
          data,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setState({
        isLoading: false,
        data: null,
        error,
      });
    }
  }

  useEffect(() => {
    fetchData(url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const result: UseFetchResult<T> = {
    ...state,
    refetch: fetchData,
  };

  return result;
}
