import request from 'superagent';

const URL = process.env.REACT_APP_API_URL;

export function fetchDestinations() {
    try {
        return request.get(`${URL}/destinations`);
    } catch(e) {
        return {error: e.message };
    }
}

export function fetchDestination(id) {
    try {
        return request.get(`${URL}/destinations/${id}`);
    } catch(e) {
        return {error: e.message };
    }
}

export function createDestination(destinationData) {
    try {
        return request.post(`${URL}/destinations`, destinationData);
    } catch(e) {
        return {error: e.message };
    }
}

export function fetchAgents() {
    try {
        return request.get(`${URL}/agents`);
    } catch(e) {
        return {error: e.message };
    }
}

export function updateDestination(id, updatedDestination) {
    try {
        return request.put(`${URL}/destinations/${id}`, updatedDestination);
    } catch(e) {
        return {error: e.message };
    }
}

export function deleteDestination(id) {
    debugger
    try {
        return request.delete(`${URL}/destinations/${id}`);
    } catch(e) {
        return {error: e.message };
    }
}