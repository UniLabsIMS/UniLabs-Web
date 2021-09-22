import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
  NEW_CAT_FAIL,
  NEW_CAT_LOADING,
  NEW_CAT_SUCCESS,
  RESET_DASHBOARD_STATE,
} from '../../actionTypes/labManagerActionTypes';
import Category from '../../../models/category';

const initialState = {
  categories: [],
  isCategoriesLoading: false,
  isCategoriesError: false,
  newCategoryLoading: false,
  newCategoryError: false,
  newCategorySuccess: false,
  reloadCategories: false,
};

const labManagerDashReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DASHBOARD_STATE:
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
    case NEW_CAT_LOADING:
      return {
        ...state,
        newCategoryLoading: true,
        isCategoriesError: false,
        newCategoryError: false,
        newCategorySuccess: false,
        reloadCategories: false,
      };
    case NEW_CAT_SUCCESS:
      return {
        ...state,
        newCategoryLoading: false,
        newCategorySuccess: true,
        reloadCategories: true,
      };
    case NEW_CAT_FAIL:
      return {
        ...state,
        newCategoryLoading: false,
        newCategoryError: true,
      };
    default:
      return state;
  }
};
export default labManagerDashReducer;
