import { HttpClient } from './http-client';

function getNextMessage(messages: string[]): Promise<string> {
    // return HttpClient.get(`/converse/${messages.join('\n')}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fake AI message');
        }, 1000);
    });
}

export {
    getNextMessage,
};
