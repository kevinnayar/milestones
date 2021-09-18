import config from '../../client/clientConfig';

type ApiClientOpts = {
  token?: string;
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

function getUrlSearchParams(query?: { [k: string]: string }): string {
  if (!query) return '';
  const queryParams = [];

  for (const [key, value] of Object.entries(query)) {
    queryParams.push(`${key}=${encodeURIComponent(value)}`);
  }

  return queryParams.length ? `?${queryParams.join('&')}` : '';
}

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

class ApiClient {
  private async call<T>(method: Method, route: string, opts?: ApiClientOpts) {
    const token = opts && opts.token ? opts.token : undefined;
    const body = opts && opts.body ? opts.body : undefined;
    const query = opts && opts.query ? opts.query : undefined;

    const params = getUrlSearchParams(query);
    const url = `${config.api.baseUrl}/api/v1${route}${params}`;

    const init: RequestInit = {
      method: getMethod(method),
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'include',
      body : JSON.stringify(body || {}),
    };

    const res = await fetch(url, init);
    const data: T = await res.json();

    if (!res.ok) {
      // @ts-ignore
      const message = data && data.message ? data.message : "Wasn't able to load data.";
      throw new Error(message);
    }

    return data;
  }

  async get<T>(route: string, opts?: ApiClientOpts) {
    return (await this.call('get', route, opts)) as T;
  }

  async post<T>(route: string, opts?: ApiClientOpts) {
    return (await this.call('post', route, opts)) as T;
  }

  async put<T>(route: string, opts?: ApiClientOpts) {
    return (await this.call('put', route, opts)) as T;
  }

  async patch<T>(route: string, opts?: ApiClientOpts) {
    return (await this.call('patch', route, opts)) as T;
  }

  async delete<T>(route: string, opts?: ApiClientOpts) {
    return (await this.call('delete', route, opts)) as T;
  }
}

export const apiClient = new ApiClient();

