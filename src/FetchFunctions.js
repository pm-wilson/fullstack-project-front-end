import request from 'superagent';

const URL = 'https://safe-spire-71706.herokuapp.com';
const id = '';

export function fetchDestinations() {
    return request.get(`${URL}/destinations`);
}

export function fetchDestination() {
    return request.get(`${URL}/destinations/${id}`);
}