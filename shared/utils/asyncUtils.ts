export async function callApi<T>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, opts);
  const data: T = await res.json();

  if (!res.ok) {
    /// @ts-ignore
    const message = data && 'message' in data ? data.message : "Wasn't able to load data";
    throw new Error(message);
  }

  return data;
}


