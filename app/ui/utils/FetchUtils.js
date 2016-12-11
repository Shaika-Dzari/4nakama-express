export function parseOrReject(response) {
    if (response.ok) return response.json();

    response.json().then(j => {
        throw new Error(response.url, response.status, j);
    });
}

// Thanks to https://github.com/matthew-andrews/fetchres
export class ApiError extends Error {

	constructor(url, status, json) {
		super();
		this.message = `${url} responded with a ${status}`;
		this.name = 'ApiError';
        this.json = json;
	}
}