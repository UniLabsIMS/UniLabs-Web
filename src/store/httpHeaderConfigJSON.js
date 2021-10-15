export default function httpHeaderConfigJSON(getState) {
  const { token } = getState().auth;

  /* Headers */
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /* If token, add to headers config */
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
}
