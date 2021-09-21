import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_LOADED,
  AUTH_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from '../actionTypes/authActionTypes';
import { API_LOGIN_URL, API_LOGOUT_URL, API_REFRESH_URL } from '../apiConfig';
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
  const body = JSON.stringify({ email, password });
  dispatch({ type: AUTH_LOADING });
  axios
    .post(API_LOGIN_URL, body, httpHeaderConfig(getState))
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
