import {
  ITEMS_ERROR,
  ITEMS_LOADED,
  ITEMS_LOADING,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_LOADING,
  ITEM_DELETE_SUCCESS,
  NEW_ITEM_FAIL,
  NEW_ITEM_LOADING,
  NEW_ITEM_SUCCESS,
  RESET_ITEMS_STATE,
  RESET_NEW_ITEM_STATE,
} from '../../actionTypes/labManagerActionTypes';
import Item from '../../../models/item';

const initialState = {
  items: [],
  isItemsLoading: false,
  isItemsError: false,
  newItemLoading: false,
  newItemError: false,
  newItemSuccess: false,
  newItemID: null,
  deleteItemLoading: false,
  deleteItemSucess: false,
  deleteItemError: false,
  reloadItems: false,
};

const labManagerItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ITEMS_STATE:
      return initialState;
    case RESET_NEW_ITEM_STATE:
      return {
        ...state,
        newItemLoading: false,
        newItemError: false,
        newItemSuccess: false,
        newItemID: null,
        reloadItems: false,
      };
    case ITEMS_LOADING:
      return {
        ...state,
        isItemsLoading: true,
        isItemsError: false,
        reloadItems: false,
      };
    case ITEMS_LOADED:
      return {
        ...state,
        isItemsLoading: false,
        items: action.payload.map(obj => new Item(obj)),
        isItemsError: false,
      };
    case ITEMS_ERROR:
      return {
        ...state,
        isItemsLoading: false,
        items: [],
        isItemsError: true,
      };
    case NEW_ITEM_LOADING:
      return {
        ...state,
        newItemLoading: true,
        isItemsError: false,
        newItemError: false,
        newItemSuccess: false,
        newItemID: null,
        reloadItems: false,
      };
    case NEW_ITEM_SUCCESS:
      return {
        ...state,
        newItemLoading: false,
        newItemSuccess: true,
        reloadItems: true,
        newItemID: action.payload.id,
      };
    case NEW_ITEM_FAIL:
      return {
        ...state,
        newItemLoading: false,
        newItemError: true,
        newItemID: null,
      };
    case ITEM_DELETE_LOADING:
      return {
        ...state,
        deleteItemLoading: true,
        deleteItemError: false,
        deleteItemSuccess: false,
      };
    case ITEM_DELETE_SUCCESS:
      return {
        ...state,
        deleteItemLoading: false,
        deleteItemSuccess: true,
        reloadItems: true,
      };
    case ITEM_DELETE_FAIL:
      return {
        ...state,
        deleteItemLoading: false,
        deleteItemError: true,
      };
    default:
      return state;
  }
};
export default labManagerItemsReducer;
