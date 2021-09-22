import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
  NEW_DSP_ITEM_FAIL,
  NEW_DSP_ITEM_LOADING,
  NEW_DSP_ITEM_SUCCESS,
  RESET_DISPLAY_ITEMS_STATE,
} from '../../actionTypes/labManagerActionTypes';
import DisplayItem from '../../../models/display_item';

const initialState = {
  displayItems: [],
  isDisplayItemsLoading: false,
  isDisplayItemsError: false,
  newDisplayItemLoading: false,
  newDisplayItemError: false,
  newDisplayItemSuccess: false,
  reloadDisplayItems: false,
};

const labManagerDisplayItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DISPLAY_ITEMS_STATE:
      return initialState;
    case DISPLAY_ITEMS_LOADING:
      return {
        ...state,
        isDisplayItemsLoading: true,
        isDisplayItemsError: false,
        reloadDisplayItems: false,
      };
    case DISPLAY_ITEMS_LOADED:
      return {
        ...state,
        isDisplayItemsLoading: false,
        displayItems: action.payload.map(obj => new DisplayItem(obj)),
        isDisplayItemsError: false,
      };
    case DISPLAY_ITEMS_ERROR:
      return {
        ...state,
        isDisplayItemsLoading: false,
        displayItems: [],
        isDisplayItemsError: true,
      };
    case NEW_DSP_ITEM_LOADING:
      return {
        ...state,
        newDisplayItemLoading: true,
        isDisplayItemsError: false,
        newDisplayItemError: false,
        newDisplayItemSuccess: false,
        reloadDisplayItems: false,
      };
    case NEW_DSP_ITEM_SUCCESS:
      return {
        ...state,
        newDisplayItemLoading: false,
        newDisplayItemSuccess: true,
        reloadDisplayItems: true,
      };
    case NEW_DSP_ITEM_FAIL:
      return {
        ...state,
        newDisplayItemLoading: false,
        newDisplayItemError: true,
      };
    default:
      return state;
  }
};
export default labManagerDisplayItemsReducer;
