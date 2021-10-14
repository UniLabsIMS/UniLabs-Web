import {
  TEMP_BORROWED_ITEMS_ERROR,
  TEMP_BORROWED_ITEMS_LOADED,
  TEMP_BORROWED_ITEMS_LOADING,
  RESET_TEMP_BORROWED_ITEMS_STATE,
} from '../../actionTypes/labAssistantActionTypes';
import BorrowedItem from '../../../models/borrowedItem';

const initialState = {
  tempBorrowedItems: [],
  isTempBorrowedItemsLoading: false,
  isTempBorrowedItemsError: false,
  reloadTempBorrowedItems: false,
};

const labAssistantBorrowedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_TEMP_BORROWED_ITEMS_STATE:
      return initialState;
    case TEMP_BORROWED_ITEMS_LOADING:
      return {
        ...state,
        isTempBorrowedItemsLoading: true,
        isTempBorrowedItemsError: false,
        reloadTempBorrowedItems: false,
      };
    case TEMP_BORROWED_ITEMS_LOADED:
      return {
        ...state,
        isTempBorrowedItemsLoading: false,
        tempBorrowedItems: action.payload.map(obj => new BorrowedItem(obj)),
        isTempBorrowedItemsError: false,
      };
    case TEMP_BORROWED_ITEMS_ERROR:
      return {
        ...state,
        isTempBorrowedItemsLoading: false,
        tempBorrowedItems: [],
        isTempBorrowedItemsError: true,
      };

    default:
      return state;
  }
};
export default labAssistantBorrowedItemsReducer;
