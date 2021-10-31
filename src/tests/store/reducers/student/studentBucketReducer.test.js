import BucketItem from '../../../../models/bucketItem';
import DisplayItem from '../../../../models/display_item';
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

  //   it('handles ADD_TO_BUCKET_STATE event as expected', () => {
  //     const reducer = studentLabBucketReducer(initialState, {
  //       type: ADD_TO_BUCKET,
  //       payload: [],
  //     });

  //     expect(reducer).toEqual({
  //       ...initialState,
  //       bucketItems: [],
  //       totalItemCount: 1,
  //     });
  //   });
});
