import axios from 'axios';

const BASE_URL = '/group';

export function findAll() {
  return axios.get(BASE_URL);
}

export function createGroup(title, description, location) {
  return axios.post(BASE_URL, { title, description, location });
}

export function deleteGroup(id) {
  return axios.delete(`${BASE_URL}/${id}`);
}
