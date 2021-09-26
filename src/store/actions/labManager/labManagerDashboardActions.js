/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
  EDIT_CAT_FAIL,
  EDIT_CAT_LOADING,
  EDIT_CAT_RESET_STATE,
  EDIT_CAT_SUCCESS,
  NEW_CAT_FAIL,
  NEW_CAT_LOADING,
  NEW_CAT_SUCCESS,
  RESET_DASHBOARD_STATE,
} from '../../actionTypes/labManagerActionTypes';
import {
  API_LAB_MANAGER_ALL_CATEGORIES_URL,
  API_LAB_MANAGER_EDIT_CATEGORIES_URL,
  API_LAB_MANAGER_NEW_CATEGORIES_URL,
} from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load categories */
export const fetchCategories = () => (dispatch, getState) => {
  dispatch({ type: CATEGORIES_LOADING });
  axios
    .get(
      API_LAB_MANAGER_ALL_CATEGORIES_URL.concat(
        getState().auth.user.other_details.lab.id,
      ),
      httpHeaderConfig(getState),
    )
    .then(res => {
      dispatch({
        type: CATEGORIES_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: CATEGORIES_ERROR,
      });
    });
};

/* Add categories */
export const addCategory =
  (name, description, image) => (dispatch, getState) => {
    dispatch({ type: NEW_CAT_LOADING });
    const formData = new FormData();
    const lab = getState().auth.user.other_details.lab.id;
    formData.append('name', name);
    formData.append('description', description);
    formData.append('lab', lab);
    axios
      .post(
        API_LAB_MANAGER_NEW_CATEGORIES_URL,
        formData,
        httpHeaderConfig(getState),
      )
      .then(res => {
        dispatch({
          type: NEW_CAT_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: NEW_CAT_FAIL,
        });
      });
  };

/* Edit categories */
export const editCategory =
  (name, description, catID) => (dispatch, getState) => {
    dispatch({ type: EDIT_CAT_LOADING });
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    axios
      .put(
        API_LAB_MANAGER_EDIT_CATEGORIES_URL.concat(`${catID}`),
        formData,
        httpHeaderConfig(getState),
      )
      .then(res => {
        dispatch({
          type: EDIT_CAT_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: EDIT_CAT_FAIL,
        });
      });
  };
/* Reset Edit Category State */
export const editCategoryResetState = isReload => (dispatch, getState) => {
  dispatch({ type: EDIT_CAT_RESET_STATE, isReload });
};

/* Reset State */
export const resetLabManagerDashboardState = () => (dispatch, getState) => {
  dispatch({ type: RESET_DASHBOARD_STATE });
};
