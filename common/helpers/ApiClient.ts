import config from '../../client/clientConfig';
import { UserAuthResponse } from '../types/entityTypes';

export const PUBLIC_PATHS: { [k: string]: true } = {
  '/api/v1/users/register': true,
  '/api/v1/users/login': true,
  '/api/v1/users/logout': true,
  '/api/v1/users/refresh-token': true,
};

function getUrlSearchParams(query?: { [k: string]: string }): string {
  if (!query) return '';
  const queryParams = [];

  for (const [key, value] of Object.entries(query)) {
    queryParams.push(`${key}=${encodeURIComponent(value)}`);
  }

  return queryParams.length ? `?${queryParams.join('&')}` : '';
}

function getStringifiedBody(body?: { [k: string]: any }): { body?: string } {
  return body ? { body: JSON.stringify(body) } : {};
}

function getRequestCredentials(path: string): { credentials?: RequestCredentials } {
  const isPublic = PUBLIC_PATHS[path];
  return isPublic ? { credentials: 'include' } : {};
}

function getHeaders(path: string, token: null | string): HeadersInit {
  const isPrivate = !PUBLIC_PATHS[path];
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(isPrivate ? { Authorization: `Bearer ${token}` } : {}),
  };
  return headers;
}

type ApiClientOpts = {
  body?: { [k: string]: any };
  query?: { [k: string]: string };
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// @notes[apiClient] `ApiClient` is a singleton, so it's exported as an instance and not as a class
// @notes[apiClient] Its purpose is to abstract away the logic to make authenticated API calls
// @notes[apiClient] It contains a copy of auth state which mirrors the copy in the redux store

class ApiClient {
  auth: UserAuthResponse;

  constructor() {
    this.auth = {
      isAuthenticated: false,
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  }

  setAuth(auth: UserAuthResponse) {
    this.auth = auth;
  }

  private async call<T>(method: Method, path: string, opts?: ApiClientOpts) {
    const body = opts && opts.body ? opts.body : undefined;
    const query = opts && opts.query ? opts.query : undefined;
    const params = getUrlSearchParams(query);
    const apiPath = `/api/v1${path}`;

    console.log({apiPath, cred: getRequestCredentials(apiPath)});

    const req: RequestInit = {
      method,
      headers: getHeaders(apiPath, this.auth.token),
      ...getRequestCredentials(apiPath),
      ...getStringifiedBody(body),
    };

    const url = `${config.api.baseUrl}${apiPath}${params}`;
    const res = await fetch(url, req);
    const data: T = await res.json();

    if (!res.ok) {
      // @ts-ignore
      const message = data && data.message ? data.message : 'Wasn\'t able to load data.';
      throw new Error(message);
    }

    return data;
  }

  async get<T>(path: string, opts?: ApiClientOpts) {
    return (await this.call('GET', path, opts)) as T;
  }

  async post<T>(path: string, opts?: ApiClientOpts) {
    return (await this.call('POST', path, opts)) as T;
  }

  async put<T>(path: string, opts?: ApiClientOpts) {
    return (await this.call('PUT', path, opts)) as T;
  }

  async patch<T>(path: string, opts?: ApiClientOpts) {
    return (await this.call('PATCH', path, opts)) as T;
  }

  async delete<T>(path: string, opts?: ApiClientOpts) {
    return (await this.call('DELETE', path, opts)) as T;
  }
}

export const apiClient = new ApiClient();

