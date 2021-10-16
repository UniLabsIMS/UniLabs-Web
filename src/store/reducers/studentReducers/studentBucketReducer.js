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
import BucketItem from '../../../models/bucketItem';
import BucketLecturer from '../../../models/bucketLecturer';

const initialState = {
  bucketItems: [],
  lecturers: [],
  totalItemCount: 0,
  isBucketLoading: false,
  bucketLoaded: false,
  bucketError: false,
  isNewRequestLaoding: false,
  newRequestSuccess: false,
  newRequestError: false,
};

const studentLabBucketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BUCKET: {
      const updatedBucketItems = state.bucketItems;
      updatedBucketItems.push(new BucketItem(action.displayItemObj));
      return {
        ...state,
        bucketItems: updatedBucketItems,
        totalItemCount: state.totalItemCount + 1,
      };
    }
    case INCREASE_ITEM_BUCKET_QUNATITY: {
      const updatedBucketItems = state.bucketItems.map(bucketItem => {
        if (bucketItem.displayItemId === action.displayItemObj.id) {
          return bucketItem.increaseQuantity();
        }
        return bucketItem;
      });
      return {
        ...state,
        bucketItems: updatedBucketItems,
        totalItemCount: state.totalItemCount + 1,
      };
    }
    case DECREASE_ITEM_BUCKET_QUNATITY: {
      const updatedBucketItems = state.bucketItems.map(bucketItem => {
        if (bucketItem.displayItemId === action.displayItemObj.id) {
          return bucketItem.decreaseQuantity();
        }
        return bucketItem;
      });
      return {
        ...state,
        bucketItems: updatedBucketItems,
        totalItemCount: state.totalItemCount - 1,
      };
    }
    case REMOVE_FROM_BUCKET: {
      const updatedBucketItems = state.bucketItems.filter(
        bucketItem => bucketItem.displayItemId !== action.displayItemObj.id,
      );
      return {
        ...state,
        bucketItems: updatedBucketItems,
      };
    }
    case STUDENT_BUCKET_LECTURERS_LOADING:
      return {
        ...state,
        isBucketLoading: true,
        bucketLoaded: false,
        bucketError: false,
        isNewRequestLaoding: false,
        newRequestSuccess: false,
        newRequestError: false,
      };
    case STUDENT_BUCKET_LECTURERS_LOADED:
      return {
        ...state,
        lecturers: action.payload.map(obj => new BucketLecturer(obj)),
        isBucketLoading: false,
        bucketLoaded: true,
        bucketError: false,
      };
    case STUDENT_BUCKET_LECTURERS_ERROR:
      return {
        ...state,
        isBucketLoading: false,
        bucketLoaded: false,
        bucketError: true,
      };
    case REQUEST_CREATE_LOADING:
      return {
        ...state,
        isNewRequestLaoding: true,
        newRequestSuccess: false,
        newRequestError: false,
      };
    case REQUEST_CREATE_SUCCESS: {
      const requestedBucketItems = action.payload;
      const updatedBucketItems = state.bucketItems.filter(bucketItem => {
        const foundItem = requestedBucketItems.find(
          requestItem => requestItem.displayItemId === bucketItem.displayItemId,
        );
        if (foundItem) return false;
        return true;
      });

      return {
        ...state,
        bucketItems: updatedBucketItems,
        isNewRequestLaoding: false,
        newRequestSuccess: true,
        newRequestError: false,
      };
    }
    case REQUEST_CREATE_ERROR:
      return {
        ...state,
        isNewRequestLaoding: false,
        newRequestSuccess: false,
        newRequestError: true,
      };
    default:
      return state;
  }
};
export default studentLabBucketReducer;
