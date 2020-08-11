import axios from 'axios';

export const LOGIN_URL = '/login';
export const LOGOUT_URL = '/logout';
export const REGISTER_URL = '/signup';

export const SESSION_URL = '/session';

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(username, email, password) {
  return axios.post(REGISTER_URL, { username, email, password });
}

export function getUserSession() {
  return axios.get(SESSION_URL);
}

export function logoutUserSession() {
  return axios.post(LOGOUT_URL);
}
