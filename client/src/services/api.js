import axios from 'axios';

const api_url = 'http://10.0.0.30:5000/api/v1';

async function createAccount(username) {
    return axios.post(`${api_url}/account/create/${username}`);
}

async function getAccount(userID) {
    return axios.get(`${api_url}/account/${userID}`);
}

async function getMatch(userID) {
    return axios.get(`${api_url}/match/${userID}`);
}

async function getMessages(matchID) {
    return axios.get(`${api_url}/messages/all/${matchID}`);
}

async function postMessage(matchID, userID, message) {
    return axios.post(`${api_url}/messages/send/${matchID}`, {userID: userID, message: message});
}

export {
    createAccount,
    getAccount,
    getMatch,
    getMessages,
    postMessage
};
