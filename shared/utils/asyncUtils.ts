import { ApiTransferStatus } from '../types/baseTypes';
import { formatError } from './baseUtils';

export async function callApi<T>(url: string, optsInit?: RequestInit): Promise<T> {
  const headers = { 'Content-Type': 'application/json' };
  const credentials: RequestCredentials = 'include';
  const opts: RequestInit = {
    ...optsInit,
    headers: {
      ...(optsInit && optsInit.headers ? optsInit.headers : {}),
      ...headers,
    },
    credentials,
  };

  const res = await fetch(url, opts);
  const data: T = await res.json();

  if (!res.ok) {
    /// @ts-ignore
    const error = data && 'error' in data ? data.error : "Wasn't able to load data";
    throw new Error(error);
  }

  return data;
}

export function xferInit(): ApiTransferStatus {
  return {
    requested: false,
    succeeded: false,
    failed: false,
    error: undefined,
  };
}

export function xferRequest(): ApiTransferStatus {
  return {
    requested: true,
    succeeded: false,
    failed: false,
    error: undefined,
  };
}

export function xferSuccess(): ApiTransferStatus {
  return {
    requested: false,
    succeeded: true,
    failed: false,
    error: undefined,
  };
}

export function xferFailure(errorIn?: undefined | string | Error): ApiTransferStatus {
  const error = errorIn ? formatError(errorIn) : undefined;
  return {
    requested: false,
    succeeded: false,
    failed: true,
    error,
  };
}

export function hasXferInited(xfer: ApiTransferStatus): boolean {
  return !xfer.requested && !xfer.succeeded && !xfer.failed;
}

export function hasXferRequested(xfer: ApiTransferStatus): boolean {
  return !xfer.succeeded && !xfer.failed && xfer.requested;
}

export function hasXferSucceeded(xfer: ApiTransferStatus): boolean {
  return !xfer.requested && !xfer.failed && xfer.succeeded;
}

export function hasXferFailed(xfer: ApiTransferStatus): boolean {
  return !xfer.requested && !xfer.succeeded && xfer.failed;
}
