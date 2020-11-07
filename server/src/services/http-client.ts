export class HttpClient {

    constructor() { }

    private static getEndpoint(route: string): string {
        const proxy = '';
        const apiURL = 'http://amadeusine:8181';
        return `${proxy + apiURL}${route}`;
    }

    private static getOptions(method: 'GET'|'POST'|'PUT'|'DELETE', body?: any): any {
        const options: any = {
            method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade,
            // origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
        if (body) {
            options.body = JSON.stringify(body) // body data type must match "Content-Type" header
        }
        return options;
    }

    private static parseResponse(response: any, notJSON?: boolean) {
        if (notJSON) return response;
        else return response.json(); // parses JSON response into native JavaScript objects
    }

    public static async get(url: string, notJSON?: boolean) {
        const response = await fetch(HttpClient.getEndpoint(url), HttpClient.getOptions('GET'));
        return HttpClient.parseResponse(response, notJSON);
    }

    public static async post(url: string, body: any, notJSON?: boolean) {
        const response = await fetch(HttpClient.getEndpoint(url), HttpClient.getOptions('POST', body));
        return HttpClient.parseResponse(response, notJSON);
    }

    public static async put(url: string, body: any, notJSON?: boolean) {
        const response = await fetch(HttpClient.getEndpoint(url), HttpClient.getOptions('PUT', body));
        return HttpClient.parseResponse(response, notJSON);
    }

    public static async delete(url: string, notJSON?: boolean) {
        const response = await fetch(HttpClient.getEndpoint(url), HttpClient.getOptions('DELETE'));
        return HttpClient.parseResponse(response, notJSON);
    }
}
