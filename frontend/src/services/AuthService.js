import { ACCESS_TOKEN } from 'utils/constants';
import { getWithToken } from 'utils/request/Request';
import { login as fetchLogin } from 'services/accounts/AccountsService';

const login = (username, password) => {
  return fetchLogin(username, password)
    .then((response) => {
      localStorage.setItem(ACCESS_TOKEN, response.data['token']);

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

const user = () => {
  return getWithToken("/api/accounts/me")
    .then(res => res.data)
};

export default {
  login,
  logout,
  user,
};