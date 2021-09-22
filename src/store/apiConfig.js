/* eslint-disable import/prefer-default-export */
export const API_BASE_URL = 'https://unilabs-api.herokuapp.com';
// export const API_BASE_URL = 'http://127.0.0.1:8000';
export const API_LOGIN_URL = API_BASE_URL.concat('/auth/login/');
export const API_REFRESH_URL = API_BASE_URL.concat('/auth/refresh-auth/');
export const API_LOGOUT_URL = API_BASE_URL.concat('/auth/logout/');

export const API_LAB_MANAGER_ALL_CATEGORIES_URL = API_BASE_URL.concat(
  '/categories/of-lab/',
); // concat the lab id to this
