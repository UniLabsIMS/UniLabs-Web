export default function httpHeaderConfig(getState) {
  const { token } = getState().auth;

  /* Headers */
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  /* If token, add to headers config */
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
}
