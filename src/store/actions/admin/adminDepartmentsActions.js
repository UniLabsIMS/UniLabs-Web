/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  DEPARTMENTS_ERROR,
  DEPARTMENTS_LOADED,
  DEPARTMENTS_LOADING,
  NEW_DEPARTMENT_FAIL,
  NEW_DEPARTMENT_LOADING,
  NEW_DEPARTMENT_SUCCESS,
  RESET_DEPARTMENT_STATE,
} from '../../actionTypes/adminActionTypes';
import {
  API_ADMIN_DEPARTMENTS_URL,
  API_ADMIN_NEW_DEPARTMENT_URL,
} from '../../apiConfig';

/* Load departments */
export const fetchDepartments = () => (dispatch, getState) => {
  dispatch({ type: DEPARTMENTS_LOADING });
  axios
    .get(API_ADMIN_DEPARTMENTS_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: DEPARTMENTS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: DEPARTMENTS_ERROR,
      });
    });
};

/* Add department */
export const addDepartment = (name, code) => (dispatch, getState) => {
  dispatch({ type: NEW_DEPARTMENT_LOADING });
  const formData = new FormData();
  formData.append('name', name);
  formData.append('code', code);
  axios
    .post(API_ADMIN_NEW_DEPARTMENT_URL, formData, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: NEW_DEPARTMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: NEW_DEPARTMENT_FAIL,
      });
    });
};

/* Reset State */
export const resetAdminDepartmentState = () => (dispatch, getState) => {
  dispatch({ type: RESET_DEPARTMENT_STATE });
};
