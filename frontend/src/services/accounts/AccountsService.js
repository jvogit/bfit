import axios, { getWithToken } from 'utils/request/Request';

export async function signup(name, username, email, password) {
  return axios.post('/api/accounts/signup', {
    name: name,
    username: username,
    email: email,
    password: password
  });
}

export async function login(username, password) {
  return axios.post('/api/accounts/login', {
    username: username,
    password: password
  });
}

export async function me() {
  return getWithToken("/api/accounts/me");
}

export default {
  signup,
  login,
  me,
};