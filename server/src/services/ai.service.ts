import { HttpClient } from './http-client';

function getNextMessage(messages: string[]): Promise<string> {
    // return HttpClient.post('/api/v1/nextmessage', messages);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fake AI message');
        }, 1000);
    });
}

export {
    getNextMessage,
};
