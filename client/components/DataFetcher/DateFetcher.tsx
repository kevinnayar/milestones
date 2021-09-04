import * as React from 'react';
import { useFetch } from '../../hooks/useFetch';

type FetchProps = {
  url: string;
  id: string;
  component: any;
};

export function DataFetcher<T>(props: FetchProps) {
  const { id, url, component: Component } = props;
  const classNames = `data-fetcher data-fetcher--${id.replace(/\s/g, '-').toLowerCase()}`;
  const {
    isLoading,
    data,
    error,
    refetch,
  } = useFetch<T>(url);

  if (isLoading) {
    return (
      <div className={classNames}>
        <div className="loading-modal">
          <div className="loader">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames}>
        {error.message && <p className="error">{error.message}</p>}
        <button type="button" onClick={() => refetch(url)}>
          try again
        </button>
      </div>
    );
  }

  if (data) {
    return (
      <div className={classNames}>
        <Component data={data} refetch={() => refetch(url)} />
      </div>
    );
  }

  return null;
}
