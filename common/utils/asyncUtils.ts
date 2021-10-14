import { FetchState } from '../types/baseTypes';
import { formatError } from './baseUtils';

export function fetchInit<T>(): FetchState<T> {
  return {
    loading: false,
    data: null,
    error: null,
  };
}

export function fetchRequest<T>(): FetchState<T> {
  return {
    loading: true,
    data: null,
    error: null,
  };
}

export function fetchSuccess<T>(data: T): FetchState<T> {
  return {
    loading: false,
    data,
    error: null,
  };
}

export function fetchFailure<T>(errorMaybe?: string | Error): FetchState<T> {
  const error = errorMaybe ? formatError(errorMaybe) : 'Could not fetch data';
  return {
    loading: false,
    data: null,
    error,
  };
}

export function hasFetchNotStarted<T>(fetchState: FetchState<T>): boolean {
  return !fetchState.loading && fetchState.data === null && fetchState.error === null;
}

export function hasFetchRequested<T>(fetchState: FetchState<T>): boolean {
  return fetchState.loading && fetchState.data === null && fetchState.error === null;
}

export function hasFetchSucceeded<T>(fetchState: FetchState<T>): boolean {
  return !fetchState.loading && fetchState.data !== null && fetchState.error === null;
}

export function hasFetchFailed<T>(fetchState: FetchState<T>): boolean {
  return !fetchState.loading && fetchState.data === null && fetchState.error !== null;
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

