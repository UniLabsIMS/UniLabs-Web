import BucketItem from '../../../../models/bucketItem';
import DisplayItem from '../../../../models/display_item';
import { displayItemResponseData } from '../../../data/displayItemResponseData';
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
} from '../../../../store/actionTypes/studentActionTypes';
import studentLabBucketReducer from '../../../../store/reducers/studentReducers/studentBucketReducer';

describe('Student - Bucket Reducer', () => {
  const initialState = {
    bucketItems: [],
    lecturers: [],
    isActiveRequestForLab: false,
    totalItemCount: 0,
    isBucketLoading: false,
    bucketLoaded: false,
    bucketError: false,
    isNewRequestLaoding: false,
    newRequestSuccess: false,
    newRequestError: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = studentLabBucketReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles ADD_TO_BUCKET_STATE event as expected', () => {
    const displayItemObj = new DisplayItem(displayItemResponseData);
    const reducer = studentLabBucketReducer(initialState, {
      type: ADD_TO_BUCKET,
      displayItemObj,
    });

    expect(reducer).toEqual({
      ...initialState,
      bucketItems: [new BucketItem(displayItemObj)],
      totalItemCount: 1,
    });
  });

  //   it('handles INCREASE_ITEM_BUCKET_QUNATITY event as expected', () => {
  //     const displayItemObj = new DisplayItem(displayItemResponseData);
  //     const bucketItemObj = new BucketItem(displayItemObj);
  //     const testStartState = {
  //       ...initialState,
  //       bucketItems: [bucketItemObj],
  //       totalItemCount: bucketItemObj.quantity,
  //     };
  //     const reducer = studentLabBucketReducer(testStartState, {
  //       type: ADD_TO_BUCKET,
  //       displayItemObj,
  //     });
  //     const updatedBucketItem = bucketItemObj.increaseQuantity();
  //     expect(reducer).toEqual({
  //       ...testStartState,
  //       bucketItems: [updatedBucketItem],
  //       totalItemCount: updatedBucketItem.quantity,
  //     });
  //   });
});
