/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ITEM_STATE_TEMP_BORROWED } from '../../../app/constants';
import {
  TEMP_BORROWED_ITEMS_ERROR,
  TEMP_BORROWED_ITEMS_LOADED,
  TEMP_BORROWED_ITEMS_LOADING,
  RESET_TEMP_BORROWED_ITEMS_STATE,
} from '../../actionTypes/labAssistantActionTypes';
import { API_LAB_ASSISTANT_BORROWED_ITEMS_URL } from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load TEMP BORROWED ITEMS */
export const fetchLabAssistantTempBorrowedItems =
  () => (dispatch, getState) => {
    dispatch({ type: TEMP_BORROWED_ITEMS_LOADING });
    axios
      .get(
        API_LAB_ASSISTANT_BORROWED_ITEMS_URL.concat(
          getState().auth.user.other_details.lab.id,
        ),
        httpHeaderConfig(getState),
      )
      .then(res => {
        const allBorrowedItems = res.data.filter(
          borrowedItemData =>
            borrowedItemData.item.state === ITEM_STATE_TEMP_BORROWED,
        );
        dispatch({
          type: TEMP_BORROWED_ITEMS_LOADED,
          payload: allBorrowedItems,
        });
      })
      .catch(err => {
        dispatch({
          type: TEMP_BORROWED_ITEMS_ERROR,
        });
      });
  };

/* Reset State */
export const resetLabAssistantTempBorrowedItemsState =
  () => (dispatch, getState) => {
    dispatch({ type: RESET_TEMP_BORROWED_ITEMS_STATE });
  };
