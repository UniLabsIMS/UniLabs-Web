import axios from 'axios';
import {
  ADD_TO_BUCKET,
  DECREASE_ITEM_BUCKET_QUNATITY,
  INCREASE_ITEM_BUCKET_QUNATITY,
  REMOVE_FROM_BUCKET,
  STUDENT_BUCKET_LECTURERS_ERROR,
  STUDENT_BUCKET_LECTURERS_LOADED,
  STUDENT_BUCKET_LECTURERS_LOADING,
} from '../../actionTypes/studentActionTypes';
import { API_STUDENT_LECTURERS_OF_LAB_URL } from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

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
  (studentId, lecturerId, labId, reason, bucketItems) =>
  (dispatch, getState) => {
    // dispatch({ type: NEW_CAT_LOADING });
    // const formData = new FormData();
    // const lab = getState().auth.user.otherDetails.lab.id;
    // formData.append('name', name);
    // formData.append('description', description);
    // formData.append('lab', lab);
    // if (image !== null) {
    //   formData.append('image', image);
    // }
    // axios
    //   .post(
    //     API_LAB_MANAGER_NEW_CATEGORIES_URL,
    //     formData,
    //     httpHeaderConfig(getState),
    //   )
    //   .then(res => {
    //     dispatch({
    //       type: NEW_CAT_SUCCESS,
    //       payload: res.data,
    //     });
    //   })
    //   .catch(err => {
    //     dispatch({
    //       type: NEW_CAT_FAIL,
    //     });
    //   });
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
