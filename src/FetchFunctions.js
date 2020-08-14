import request from 'superagent';

const URL = process.env.REACT_APP_API_URL || 'https://safe-spire-71706.herokuapp.com';

export function fetchDestinations() {
    return request.get(`${URL}/destinations`);
}

export function fetchDestination(id) {
    return request.get(`${URL}/destinations/${id}`);
}