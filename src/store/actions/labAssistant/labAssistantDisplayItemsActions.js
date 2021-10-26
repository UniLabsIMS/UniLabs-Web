/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
  RESET_DISPLAY_ITEMS_STATE,
} from '../../actionTypes/labAssistantActionTypes';
import { API_LAB_ASSISTANT_ALL_DISPLAY_ITEMS_URL } from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load display items */
export const fetchLabAssistantDisplayItems =
  categoryID => (dispatch, getState) => {
    dispatch({ type: DISPLAY_ITEMS_LOADING });
    axios
      .get(
        API_LAB_ASSISTANT_ALL_DISPLAY_ITEMS_URL.concat(categoryID.toString()),
        httpHeaderConfig(getState),
      )
      .then(
        res => {
          dispatch({
            type: DISPLAY_ITEMS_LOADED,
            payload: res.data,
          });
        },
        err => {
          dispatch({
            type: DISPLAY_ITEMS_ERROR,
          });
        },
      );
  };

/* Reset State */
export const resetLabAssistantDisplayItemsPageState =
  () => (dispatch, getState) => {
    dispatch({ type: RESET_DISPLAY_ITEMS_STATE });
  };
