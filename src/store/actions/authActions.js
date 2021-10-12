import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_LOADED,
  AUTH_LOADING,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from '../actionTypes/authActionTypes';
import {
  API_FORGOT_PASSWORD_URL,
  API_LOGIN_URL,
  API_LOGOUT_URL,
  API_REFRESH_URL,
} from '../apiConfig';
import httpHeaderConfig from '../httpHeaderConfig';

/* Load user at start */
export const refreshAuth = () => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .get(API_REFRESH_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: AUTH_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

/* Login */
export const login = (email, password) => (dispatch, getState) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  dispatch({ type: LOGIN_LOADING });
  axios
    .post(API_LOGIN_URL, formData, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(API_LOGOUT_URL, {}, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: LOGOUT_FAIL,
      });
    });
};

export const forgotPassword = email => (dispatch, getState) => {
  const formData = new FormData();
  formData.append('email', email);
  axios
    .put(API_FORGOT_PASSWORD_URL, formData, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
      });
    });
};
