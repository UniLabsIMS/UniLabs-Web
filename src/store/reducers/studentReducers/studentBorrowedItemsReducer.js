import {
  STUDENT_BORROWED_ITEMS_ERROR,
  STUDENT_BORROWED_ITEMS_LOADED,
  STUDENT_BORROWED_ITEMS_LOADING,
  RESET_STUDENT_BORROWED_ITEMS_STATE,
} from '../../actionTypes/studentActionTypes';
import BorrowedItem from '../../../models/borrowedItem';

const initialState = {
  borrowedItems: [],
  isborrowedItemsLoading: false,
  isborrowedItemsError: false,
  reloadborrowedItems: false,
};

const studentBorrowedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STUDENT_BORROWED_ITEMS_STATE:
      return initialState;
    case STUDENT_BORROWED_ITEMS_LOADING:
      return {
        ...state,
        isborrowedItemsLoading: true,
        isborrowedItemsError: false,
        reloadborrowedItems: false,
      };
    case STUDENT_BORROWED_ITEMS_LOADED:
      return {
        ...state,
        isborrowedItemsLoading: false,
        borrowedItems: action.payload.map(obj => new BorrowedItem(obj)),
        isborrowedItemsError: false,
      };
    case STUDENT_BORROWED_ITEMS_ERROR:
      return {
        ...state,
        isborrowedItemsLoading: false,
        borrowedItems: [],
        isborrowedItemsError: true,
      };

    default:
      return state;
  }
};
export default studentBorrowedItemsReducer;
