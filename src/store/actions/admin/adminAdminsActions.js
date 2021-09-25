/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  ADMINS_ERROR,
  ADMINS_LOADED,
  ADMINS_LOADING,
  NEW_ADMIN_FAIL,
  NEW_ADMIN_LOADING,
  NEW_ADMIN_SUCCESS,
  RESET_ADMIN_STATE,
} from '../../actionTypes/adminActionTypes';
import { API_ADMIN_ADMINS_URL, API_ADMIN_NEW_ADMIN_URL } from '../../apiConfig';

/* Load admins */
export const fetchAdmins = () => (dispatch, getState) => {
  dispatch({ type: ADMINS_LOADING });
  axios
    .get(API_ADMIN_ADMINS_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: ADMINS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: ADMINS_ERROR,
      });
    });
};

/* Add admin */
export const addAdmin = email => (dispatch, getState) => {
  dispatch({ type: NEW_ADMIN_LOADING });
  const formData = new FormData();
  formData.append('email', email);
  axios
    .post(API_ADMIN_NEW_ADMIN_URL, formData, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: NEW_ADMIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: NEW_ADMIN_FAIL,
      });
    });
};

/* Reset State */
export const resetAdminAdminState = () => (dispatch, getState) => {
  dispatch({ type: RESET_ADMIN_STATE });
};
