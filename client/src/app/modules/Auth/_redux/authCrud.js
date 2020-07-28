import axios from "axios";

export const LOGIN_URL = "/login";
export const LOGOUT_URL = "/logout";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const SESSION_URL = "/session";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserSession() {
  return axios.get(SESSION_URL);
}

export function logoutUserSession() {
  return axios.post(LOGOUT_URL);
}
