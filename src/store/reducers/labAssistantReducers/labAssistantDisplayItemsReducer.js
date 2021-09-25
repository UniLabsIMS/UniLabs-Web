import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
  RESET_DISPLAY_ITEMS_STATE,
} from '../../actionTypes/labAssistantActionTypes';
import DisplayItem from '../../../models/display_item';

const initialState = {
  displayItems: [],
  isDisplayItemsLoading: false,
  isDisplayItemsError: false,
  reloadDisplayItems: false,
};

const labAssistantDisplayItemsReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};
export default labAssistantDisplayItemsReducer;
