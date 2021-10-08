import {
  BORROWED_ITEMS_ERROR,
  BORROWED_ITEMS_LOADED,
  BORROWED_ITEMS_LOADING,
  RESET_BORROWED_ITEMS_STATE,
} from '../../actionTypes/labAssistantActionTypes';
import BorrowedItem from '../../../models/borrowedItem';

const initialState = {
  borrowedItems: [],
  isborrowedItemsLoading: false,
  isborrowedItemsError: false,
  reloadborrowedItems: false,
};

const labAssistantBorrowedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_BORROWED_ITEMS_STATE:
      return initialState;
    case BORROWED_ITEMS_LOADING:
      return {
        ...state,
        isborrowedItemsLoading: true,
        isborrowedItemsError: false,
        reloadborrowedItems: false,
      };
    case BORROWED_ITEMS_LOADED:
      return {
        ...state,
        isborrowedItemsLoading: false,
        borrowedItems: action.payload.map(obj => new BorrowedItem(obj)),
        isborrowedItemsError: false,
      };
    case BORROWED_ITEMS_ERROR:
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
export default labAssistantBorrowedItemsReducer;
