/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ITEM_STATE_BORROWED } from '../../../app/constants';
import {
  BORROWED_ITEMS_ERROR,
  BORROWED_ITEMS_LOADED,
  BORROWED_ITEMS_LOADING,
  RESET_BORROWED_ITEMS_STATE,
} from '../../actionTypes/labAssistantActionTypes';
import { API_LAB_ASSISTANT_BORROWED_ITEMS_URL } from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load BORROWED ITEMS */
export const fetchLabAssistantBorrowedItems = () => (dispatch, getState) => {
  dispatch({ type: BORROWED_ITEMS_LOADING });
  axios
    .get(
      API_LAB_ASSISTANT_BORROWED_ITEMS_URL.concat(
        getState().auth.user.otherDetails.lab.id,
      ),
      httpHeaderConfig(getState),
    )
    .then(res => {
      const allBorrowedItems = res.data.filter(
        borrowedItemData => borrowedItemData.item.state === ITEM_STATE_BORROWED,
      );
      dispatch({
        type: BORROWED_ITEMS_LOADED,
        payload: allBorrowedItems,
      });
    })
    .catch(err => {
      dispatch({
        type: BORROWED_ITEMS_ERROR,
      });
    });
};

/* Reset State */
export const resetLabAssistantBorrowedItemsState =
  () => (dispatch, getState) => {
    dispatch({ type: RESET_BORROWED_ITEMS_STATE });
  };
