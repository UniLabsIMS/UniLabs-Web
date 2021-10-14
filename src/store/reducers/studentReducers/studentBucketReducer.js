import {
  ADD_TO_BUCKET,
  DECREASE_ITEM_BUCKET_QUNATITY,
  INCREASE_ITEM_BUCKET_QUNATITY,
  REMOVE_FROM_BUCKET,
} from '../../actionTypes/studentActionTypes';
import BucketItem from '../../../models/bucketItem';

const initialState = {
  bucketItems: [],
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
    default:
      return state;
  }
};
export default studentLabBucketReducer;
