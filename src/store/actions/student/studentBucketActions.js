import axios from 'axios';
import {
  ADD_TO_BUCKET,
  DECREASE_ITEM_BUCKET_QUNATITY,
  INCREASE_ITEM_BUCKET_QUNATITY,
  REMOVE_FROM_BUCKET,
  STUDENT_BUCKET_LECTURERS_ERROR,
  STUDENT_BUCKET_LECTURERS_LOADED,
  STUDENT_BUCKET_LECTURERS_LOADING,
  REQUEST_CREATE_LOADING,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_ERROR,
} from '../../actionTypes/studentActionTypes';
import {
  API_STUDENT_LECTURERS_OF_LAB_URL,
  API_STUDENT_NEW_REQUEST_URL,
} from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';
import httpHeaderConfigJSON from '../../httpHeaderConfigJSON';

export const addDisplayItemToBucket =
  displayItemObj => (dispatch, getState) => {
    dispatch({
      type: ADD_TO_BUCKET,
      displayItemObj,
    });
  };

export const increaseItemQunatityinBucket =
  displayItemObj => (dispatch, getState) => {
    dispatch({ type: INCREASE_ITEM_BUCKET_QUNATITY, displayItemObj });
  };
export const decreaseItemQunatityinBucket =
  displayItemObj => (dispatch, getState) => {
    const { bucketItems } = getState().studentLabBucket;
    const correspondingBucketItem = bucketItems.find(
      bucketItem => bucketItem.displayItemId === displayItemObj.id,
    );
    if (correspondingBucketItem && correspondingBucketItem.quantity === 1) {
      dispatch({ type: REMOVE_FROM_BUCKET, displayItemObj });
    } else {
      dispatch({ type: DECREASE_ITEM_BUCKET_QUNATITY, displayItemObj });
    }
  };

/* Add new req */
export const addRequest =
  (lecturerId, labId, reason, requestedBucketItems) => (dispatch, getState) => {
    dispatch({ type: REQUEST_CREATE_LOADING });

    const studentId = getState().auth.user.id;
    const requestedItems = {};
    requestedBucketItems.forEach(
      // eslint-disable-next-line no-return-assign
      bucketItem =>
        (requestedItems[bucketItem.displayItemId] = bucketItem.quantity),
    );
    const data = {
      student: studentId,
      lecturer: lecturerId,
      lab: labId,
      reason,
      display_items_dict: requestedItems,
    };
    axios
      .post(API_STUDENT_NEW_REQUEST_URL, data, httpHeaderConfigJSON(getState))
      .then(res => {
        dispatch({
          type: REQUEST_CREATE_SUCCESS,
          payload: requestedBucketItems,
        });
      })
      .catch(err => {
        dispatch({
          type: REQUEST_CREATE_ERROR,
        });
      });
  };

/* Load lecturers of lab */
export const fetchLabLecturers = labId => (dispatch, getState) => {
  dispatch({ type: STUDENT_BUCKET_LECTURERS_LOADING });
  axios
    .get(
      API_STUDENT_LECTURERS_OF_LAB_URL.concat(labId),
      httpHeaderConfig(getState),
    )
    .then(res => {
      dispatch({
        type: STUDENT_BUCKET_LECTURERS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: STUDENT_BUCKET_LECTURERS_ERROR,
      });
    });
};
