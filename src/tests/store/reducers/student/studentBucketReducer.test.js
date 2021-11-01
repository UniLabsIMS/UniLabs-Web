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
    quantityChanged: false,
    lecturers: [],
    isActiveRequestForLab: false,
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
      quantityChanged: true,
    });
  });

  it('handles INCREASE_ITEM_BUCKET_QUNATITY event as expected', () => {
    const displayItemObj = new DisplayItem(displayItemResponseData);
    const bucketItem = new BucketItem(displayItemObj);
    const testStartState = {
      ...initialState,
      bucketItems: [bucketItem],
    };
    const reducer = studentLabBucketReducer(testStartState, {
      type: INCREASE_ITEM_BUCKET_QUNATITY,
      displayItemObj,
    });
    const updatedBucketItem = bucketItem.increaseQuantity();
    expect(reducer).toEqual({
      ...testStartState,
      bucketItems: [updatedBucketItem],
      quantityChanged: true,
    });
  });
  it('handles DECREASE_ITEM_BUCKET_QUNATITY event as expected', () => {
    const displayItemObj = new DisplayItem(displayItemResponseData);
    const bucketItem = new BucketItem(displayItemObj);
    bucketItem.quantity = 4;
    const testStartState = {
      ...initialState,
      bucketItems: [bucketItem],
    };
    const reducer = studentLabBucketReducer(testStartState, {
      type: DECREASE_ITEM_BUCKET_QUNATITY,
      displayItemObj,
    });
    const updatedBucketItem = bucketItem.decreaseQuantity();
    expect(reducer).toEqual({
      ...testStartState,
      bucketItems: [updatedBucketItem],
      quantityChanged: true,
    });
  });
  it('handles REMOVE_FROM_BUCKET event as expected', () => {
    const displayItemObj = new DisplayItem(displayItemResponseData);
    const bucketItem = new BucketItem(displayItemObj);
    const testStartState = {
      ...initialState,
      bucketItems: [bucketItem],
    };
    const reducer = studentLabBucketReducer(testStartState, {
      type: REMOVE_FROM_BUCKET,
      displayItemObj,
    });

    expect(reducer).toEqual({
      ...testStartState,
      bucketItems: [],
      quantityChanged: true,
    });
  });
  it('handles STUDENT_BUCKET_LECTURERS_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
    };
    const reducer = studentLabBucketReducer(testStartState, {
      type: STUDENT_BUCKET_LECTURERS_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isBucketLoading: true,
      bucketLoaded: false,
      bucketError: false,
      isNewRequestLaoding: false,
      newRequestSuccess: false,
      newRequestError: false,
    });
  });
  it('handles STUDENT_BUCKET_LECTURERS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isBucketLoading: true,
      bucketLoaded: false,
      bucketError: false,
      isNewRequestLaoding: false,
      newRequestSuccess: false,
      newRequestError: false,
    };
    const reducer = studentLabBucketReducer(testStartState, {
      type: STUDENT_BUCKET_LECTURERS_LOADED,
      payload: { check: false, lecturers: [] },
    });

    expect(reducer).toEqual({
      ...testStartState,
      lecturers: [],
      isActiveRequestForLab: false,
      isBucketLoading: false,
      bucketLoaded: true,
      bucketError: false,
    });
  });
  it('handles STUDENT_BUCKET_LECTURERS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isBucketLoading: true,
      bucketLoaded: false,
      bucketError: false,
      isNewRequestLaoding: false,
      newRequestSuccess: false,
      newRequestError: false,
    };
    const reducer = studentLabBucketReducer(testStartState, {
      type: STUDENT_BUCKET_LECTURERS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isBucketLoading: false,
      bucketLoaded: false,
      bucketError: true,
    });
  });
  it('handles REQUEST_CREATE_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
    };
    const reducer = studentLabBucketReducer(testStartState, {
      type: REQUEST_CREATE_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isNewRequestLaoding: true,
      newRequestSuccess: false,
      newRequestError: false,
    });
  });
  it('handles REQUEST_CREATE_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isNewRequestLaoding: true,
      newRequestSuccess: false,
      newRequestError: false,
    };
    const reducer = studentLabBucketReducer(testStartState, {
      type: REQUEST_CREATE_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isNewRequestLaoding: false,
      newRequestSuccess: false,
      newRequestError: true,
    });
  });
  it('handles REQUEST_CREATE_SUCCESS event as expected', () => {
    const displayItemObj = new DisplayItem(displayItemResponseData);
    const bucketItem = new BucketItem(displayItemObj);
    const testStartState = {
      ...initialState,
      bucketItems: [bucketItem],
      isNewRequestLaoding: true,
      newRequestSuccess: false,
      newRequestError: false,
    };
    const reducer = studentLabBucketReducer(testStartState, {
      type: REQUEST_CREATE_SUCCESS,
      payload: [bucketItem],
    });

    expect(reducer).toEqual({
      ...testStartState,
      bucketItems: [],
      isNewRequestLaoding: false,
      newRequestSuccess: true,
      newRequestError: false,
      quantityChanged: true,
    });
  });
});
