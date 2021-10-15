import {
  ADD_TO_BUCKET,
  DECREASE_ITEM_BUCKET_QUNATITY,
  INCREASE_ITEM_BUCKET_QUNATITY,
  REMOVE_FROM_BUCKET,
  STUDENT_BUCKET_LECTURERS_ERROR,
  STUDENT_BUCKET_LECTURERS_LOADED,
  STUDENT_BUCKET_LECTURERS_LOADING,
} from '../../actionTypes/studentActionTypes';
import BucketItem from '../../../models/bucketItem';
import BucketLecturer from '../../../models/bucketLecturer';

const initialState = {
  bucketItems: [],
  lecturers: [],
  isBucketLoading: false,
  bucketLoaded: false,
  bucketError: false,
};

const studentLabBucketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BUCKET: {
      const updatedBucketItems = state.bucketItems;
      updatedBucketItems.push(new BucketItem(action.displayItemObj));
      return {
        ...state,
        bucketItems: updatedBucketItems,
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
    default:
      return state;
  }
};
export default studentLabBucketReducer;
