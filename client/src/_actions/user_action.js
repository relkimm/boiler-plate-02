import axios from 'axios';
import { LOGIN_USER } from './types';


export function loginUser(datatToSubmit) {
    const request = axios.post('/api/users/login', datatToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}