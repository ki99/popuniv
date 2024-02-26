export const API_URL = process.env.NEXT_PUBLIC_API_URL;
const base = (path: string) => new URL(`/api${path}`, API_URL);

export async function get<TResponse, TParam = {}>(url: string, param?: TParam, cacheTag?: string[]) {
	try {
		const endpoint = !param ? base(url) : base(url) + '?' + new URLSearchParams(param);
		const response = await fetch(endpoint.toString(), cacheTag && { next: { tags: cacheTag } });
		const json = await response.json();
		const data: TResponse = await json.data;

		makeConsoleLog<TResponse>('GET', 'orange', endpoint.toString(), data);

		return data;
	} catch (error) {
		if (error) throw error;
	}
}

export async function post<TResponse, TRequest>(url: string, body: TRequest) {
	try {
		const response = await fetch(base(url).toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const json = await response.json();

		const data: TResponse = await json.data;

		makeConsoleLog<TResponse>('POST', 'blue', url, data);

		return data;
	} catch (error) {
		if (error) throw error;
	}
}

export async function put<TResponse, TRequest>(url: string, body: TRequest) {
	try {
		const response = await fetch(base(url).toString(), {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const json = await response.json();
		const data: TResponse = await json.data;

		makeConsoleLog<TResponse>('PUT', 'skyblue', url, data);

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
