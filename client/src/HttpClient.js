export class HttpClient {

    constructor() { }

    static getEndpoint(route) {
        // const proxy = 'http://localhost:8181/';
        // const apiURL = 'http://10.0.0.30:9090';
        const proxy = 'http://pi.nathangawith.com:575/';
        const apiURL = 'http://pi.nathangawith.com:900';
        return `${proxy + apiURL}${route}`;
    }

    static getOptions(method, body) {
        const options = {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            
        };
        if (body) {
            options.body = JSON.stringify(body) // body data type must match "Content-Type" header
        }
        return options;
    }

    static parseResponse(response, notJSON) {
        if (notJSON) return response;
        else return response.json(); // parses JSON response into native JavaScript objects
    }

    static async get(url, notJSON) {
        const response = await fetch(HttpClient.getEndpoint(url), HttpClient.getOptions('GET'));
        return HttpClient.parseResponse(response, notJSON);
    }

    static async post(url, body, notJSON) {
        const response = await fetch(HttpClient.getEndpoint(url), HttpClient.getOptions('POST', body));
        return HttpClient.parseResponse(response, notJSON);
    }

    static async put(url, body, notJSON) {
        const response = await fetch(HttpClient.getEndpoint(url), HttpClient.getOptions('PUT', body));
        return HttpClient.parseResponse(response, notJSON);
    }

    static async delete(url, notJSON) {
        const response = await fetch(HttpClient.getEndpoint(url), HttpClient.getOptions('DELETE'));
        return HttpClient.parseResponse(response, notJSON);
    }
}