import axios from 'axios';
import {
  ITEMS_ERROR,
  ITEMS_LOADED,
  ITEMS_LOADING,
  NEW_ITEM_FAIL,
  NEW_ITEM_LOADING,
  NEW_ITEM_SUCCESS,
  RESET_ITEMS_STATE,
  RESET_NEW_ITEM_STATE,
  ITEM_DELETE_LOADING,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
} from '../../actionTypes/labManagerActionTypes';
import {
  API_LAB_MANAGER_ALL_ITEMS_URL,
  API_LAB_MANAGER_ITEM_DELETED_URL,
  API_LAB_MANAGER_NEW_ITEM_URL,
} from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load items */
export const fetchItems = displayItemID => (dispatch, getState) => {
  dispatch({ type: ITEMS_LOADING });
  axios
    .get(
      API_LAB_MANAGER_ALL_ITEMS_URL.concat(displayItemID.toString()),
      httpHeaderConfig(getState),
    )
    .then(res => {
      dispatch({
        type: ITEMS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: ITEMS_ERROR,
      });
    });
};

/* Add item */
export const addItem = displayItemID => (dispatch, getState) => {
  dispatch({ type: NEW_ITEM_LOADING });
  const formData = new FormData();
  formData.append('display_item', displayItemID);
  axios
    .post(API_LAB_MANAGER_NEW_ITEM_URL, formData, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: NEW_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: NEW_ITEM_FAIL,
      });
    });
};

/* delete item */
export const deleteItem = itemID => (dispatch, getState) => {
  dispatch({ type: ITEM_DELETE_LOADING });
  axios
    .delete(
      API_LAB_MANAGER_ITEM_DELETED_URL.concat(`${itemID}`),
      httpHeaderConfig(getState),
    )
    .then(res => {
      dispatch({
        type: ITEM_DELETE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: ITEM_DELETE_FAIL,
      });
    });
};

export const cleanNewItemState = () => (dispatch, getState) => {
  dispatch({ type: RESET_NEW_ITEM_STATE });
};

/* Reset State */
export const resetItemsPageState = () => (dispatch, getState) => {
  dispatch({ type: RESET_ITEMS_STATE });
};
