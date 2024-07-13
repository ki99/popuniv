import { RequestGET, RequestUPDATE, ResponseBody } from '@/models/http.interface';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
const base = (path: string) => `${API_URL}${path}`;

export async function get<TResponse, TParam = {}>({ token, url, param, cacheTag }: RequestGET<TParam>) {
  try {
    const endpoint = !param ? base(url) : base(url) + '?' + new URLSearchParams(param);
    const response = await fetch(endpoint.toString(), {
      method: 'GET',
      ...(token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      ...(cacheTag && { next: { tags: cacheTag } }),
    });

    if (!response.ok) {
      return response.json().then((error) => {
        throw error.message;
      });
    }

    const data: ResponseBody<TResponse> = await response.json();

    makeConsoleLog<ResponseBody<TResponse>>('GET', 'orange', endpoint.toString(), data);

    return data;
  } catch (error) {
    if (error) throw error;
  }
}

export async function post<TResponse, TRequest>({ token, url, body }: RequestUPDATE<TRequest>) {
  try {
    const response = await fetch(base(url).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return response.json().then((error) => {
        throw error.message;
      });
    }

    const data: ResponseBody<TResponse> = await response.json();

    makeConsoleLog<ResponseBody<TResponse>>('POST', 'blue', url, data);

    return data;
  } catch (error) {
    if (error) throw error;
  }
}

export async function put<TResponse, TRequest>({ token, url, body }: RequestUPDATE<TRequest>) {
  try {
    const response = await fetch(base(url).toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return response.json().then((error) => {
        throw error.message;
      });
    }

    const data: ResponseBody<TResponse> = await response.json();

    makeConsoleLog<ResponseBody<TResponse>>('PUT', 'skyblue', url, data);

    return data;
  } catch (error) {
    if (error) throw error;
  }
}

function makeConsoleLog<T>(method: string, color: string, url: string, data: T) {
  console.log('%c--QUERY RESPONSE--', `background: ${color}; color: white`);
  console.log(`%c🐣 ${method}`, `color: ${color}`, url);
  console.log('%c✨ DATA', `color: ${color}`, data);
}
