import { HttpClient } from './http-client';

function getNextMessage(messages: string[]): Promise<string> {
    return HttpClient.get(`/converse/${messages[messages.length - 1]}`);
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('fake AI message');
    //     }, 1000);
    // });
}

export {
    getNextMessage,
};
