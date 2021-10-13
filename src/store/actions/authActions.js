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
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  IMAGE_CHANGE_LOADING,
  IMAGE_CHANGE_SUCCESS,
  IMAGE_CHANGE_ERROR,
} from '../actionTypes/authActionTypes';
import {
  API_CHANGE_PASSWORD_URL,
  API_EDIT_PROFILE_URL,
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

export const updateProfileDetails =
  (firstName, lastName, contactNumber) => (dispatch, getState) => {
    dispatch({ type: UPDATE_PROFILE_LOADING });
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('contact_number', contactNumber);
    axios
      .patch(`${API_EDIT_PROFILE_URL}`, formData, httpHeaderConfig(getState))
      .then(res => {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: UPDATE_PROFILE_ERROR,
        });
      });
  };

export const changePassword =
  (currentPassword, newPassword) => (dispatch, getState) => {
    dispatch({ type: CHANGE_PASSWORD_LOADING });
    const formData = new FormData();
    formData.append('current_password', currentPassword);
    formData.append('new_password', newPassword);
    axios
      .post(`${API_CHANGE_PASSWORD_URL}`, formData, httpHeaderConfig(getState))
      .then(res => {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: CHANGE_PASSWORD_ERROR,
        });
      });
  };

export const updateProfileImage = image => (dispatch, getState) => {
  dispatch({ type: IMAGE_CHANGE_LOADING });
  const formData = new FormData();
  formData.append('image', image);
  axios
    .patch(`${API_EDIT_PROFILE_URL}`, formData, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: IMAGE_CHANGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: IMAGE_CHANGE_ERROR,
      });
    });
};
