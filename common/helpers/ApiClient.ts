import config from '../../client/clientConfig';
import { createGuid } from '../utils/baseUtils';
import { UserAuthResponse } from '../types/entityTypes';

type ApiClientOpts = {
  body?: { [k: string]: any };
  query?: { [k: string]: string };
};

type Method =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
;

function getMethod(key: Method): string {
  const methods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE',
  };
  return methods[key];
}

function getUrlSearchParams(query?: { [k: string]: string }): string {
  if (!query) return '';
  const queryParams = [];

  for (const [key, value] of Object.entries(query)) {
    queryParams.push(`${key}=${encodeURIComponent(value)}`);
  }

  return queryParams.length ? `?${queryParams.join('&')}` : '';
}

const PUBLIC_PATHS: { [k: string]: true } = {
  '/users/register': true,
  '/users/login': true,
  '/users/logout': true,
  '/users/refresh-token': true,
};

function getRequestCredentials(path: string): { credentials?: RequestCredentials } {
  const match = PUBLIC_PATHS[path];
  return match ? { credentials: 'include' } : {};
}

function getStringifiedBody(body?: { [k: string]: any }): {body?: string } {
  return body ? { body: JSON.stringify(body) } : {};
}

function getHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return headers;
}

// @notes[ApiClient] This is a singleton class
// @notes[ApiClient] It contains a copy of auth state

class ApiClient {
  clientGuid: string;
  auth: UserAuthResponse;

  constructor() {
    this.clientGuid = createGuid('client');
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
    const headers = !PUBLIC_PATHS[path] ? getHeaders(this.auth.token) : getHeaders();
    const body = opts && opts.body ? opts.body : undefined;
    const query = opts && opts.query ? opts.query : undefined;
    const params = getUrlSearchParams(query);

    const creds = getRequestCredentials(path);
    console.log(creds, path);

    const init: RequestInit = {
      headers,
      method: getMethod(method),
      ...getRequestCredentials(path),
      ...getStringifiedBody(body),
    };

    const url = `${config.api.baseUrl}/api/v1${path}${params}`;
    const res = await fetch(url, init);
    const data: T = await res.json();

    if (!res.ok) {
      // @ts-ignore
      const message = data && data.message ? data.message : "Wasn't able to load data.";
      throw new Error(message);
    }

    return data;
  }

  async get<T>(path: string, opts?: ApiClientOpts) {
    return (await this.call('get', path, opts)) as T;
  }

  async post<T>(path: string, opts?: ApiClientOpts) {
    return (await this.call('post', path, opts)) as T;
  }

  async put<T>(path: string, opts?: ApiClientOpts) {
    return (await this.call('put', path, opts)) as T;
  }

  async patch<T>(path: string, opts?: ApiClientOpts) {
    return (await this.call('patch', path, opts)) as T;
  }

  async delete<T>(path: string, opts?: ApiClientOpts) {
    return (await this.call('delete', path, opts)) as T;
  }
}

export const apiClient = new ApiClient();

