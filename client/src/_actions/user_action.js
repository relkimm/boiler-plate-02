import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';


export function loginUser(datatToSubmit) {
    const request = axios.post('/api/users/login', datatToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSumbmit) {
    const request = axios.post('/api/users/register', dataToSumbmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/users/auth')
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}