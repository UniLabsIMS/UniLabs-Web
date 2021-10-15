/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
  EDIT_DSP_ITEM_FAIL,
  EDIT_DSP_ITEM_LOADING,
  EDIT_DSP_ITEM_RESET_STATE,
  EDIT_DSP_ITEM_SUCCESS,
  NEW_DSP_ITEM_FAIL,
  NEW_DSP_ITEM_LOADING,
  NEW_DSP_ITEM_SUCCESS,
  RESET_DISPLAY_ITEMS_STATE,
} from '../../actionTypes/labManagerActionTypes';
import {
  API_LAB_MANAGER_ALL_DISPLAY_ITEMS_URL,
  API_LAB_MANAGER_EDIT_DISPLAY_ITEM_URL,
  API_LAB_MANAGER_NEW_DISPLAY_ITEM_URL,
} from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load display items */
export const fetchDisplayItems = categoryID => (dispatch, getState) => {
  dispatch({ type: DISPLAY_ITEMS_LOADING });
  axios
    .get(
      API_LAB_MANAGER_ALL_DISPLAY_ITEMS_URL.concat(categoryID.toString()),
      httpHeaderConfig(getState),
    )
    .then(res => {
      dispatch({
        type: DISPLAY_ITEMS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: DISPLAY_ITEMS_ERROR,
      });
    });
};

/* Add display item */
export const addDisplayItem =
  (name, description, categoryID, image) => (dispatch, getState) => {
    dispatch({ type: NEW_DSP_ITEM_LOADING });
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('item_category', categoryID);
    if (image !== null) {
      formData.append('image', image);
    }
    axios
      .post(
        API_LAB_MANAGER_NEW_DISPLAY_ITEM_URL,
        formData,
        httpHeaderConfig(getState),
      )
      .then(res => {
        dispatch({
          type: NEW_DSP_ITEM_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: NEW_DSP_ITEM_FAIL,
        });
      });
  };
/* Edit display items */
export const editDisplayItem =
  (name, description, dspID) => (dispatch, getState) => {
    dispatch({ type: EDIT_DSP_ITEM_LOADING });
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    axios
      .put(
        API_LAB_MANAGER_EDIT_DISPLAY_ITEM_URL.concat(`${dspID}`),
        formData,
        httpHeaderConfig(getState),
      )
      .then(res => {
        dispatch({
          type: EDIT_DSP_ITEM_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: EDIT_DSP_ITEM_FAIL,
        });
      });
  };
/* Reset Edit display items State */
export const editDisplayItemResetState = isReload => (dispatch, getState) => {
  dispatch({ type: EDIT_DSP_ITEM_RESET_STATE, isReload });
};

/* Reset State */
export const resetDisplayItemsPageState = () => (dispatch, getState) => {
  dispatch({ type: RESET_DISPLAY_ITEMS_STATE });
};
