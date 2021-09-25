import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
  RESET_CATEGORIES_STATE,
} from '../../actionTypes/labAssistantActionTypes';
import Category from '../../../models/category';

const initialState = {
  categories: [],
  isCategoriesLoading: false,
  isCategoriesError: false,
  reloadCategories: false,
};

const labAssistantCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CATEGORIES_STATE:
      return initialState;
    case CATEGORIES_LOADING:
      return {
        ...state,
        isCategoriesLoading: true,
        isCategoriesError: false,
        reloadCategories: false,
      };
    case CATEGORIES_LOADED:
      return {
        ...state,
        isCategoriesLoading: false,
        categories: action.payload.map(obj => new Category(obj)),
        isCategoriesError: false,
      };
    case CATEGORIES_ERROR:
      return {
        ...state,
        isCategoriesLoading: false,
        categories: [],
        isCategoriesError: true,
      };

    default:
      return state;
  }
};
export default labAssistantCategoriesReducer;
