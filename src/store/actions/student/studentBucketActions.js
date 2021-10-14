import {
  ADD_TO_BUCKET,
  DECREASE_ITEM_BUCKET_QUNATITY,
  INCREASE_ITEM_BUCKET_QUNATITY,
  REMOVE_FROM_BUCKET,
} from '../../actionTypes/studentActionTypes';

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
