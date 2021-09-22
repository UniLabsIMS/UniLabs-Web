import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
  NEW_CAT_FAIL,
  NEW_CAT_LOADING,
  NEW_CAT_SUCCESS,
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
    case CATEGORIES_LOADING:
      return {
        ...state,
        isCategoriesLoading: true,
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
      };
    case NEW_CAT_SUCCESS:
      return {
        ...state,
        newCategoryLoading: false,
        newCategorySuccess: true,
        newCategoryError: false,
        reloadCategories: true,
      };
    case NEW_CAT_FAIL:
      return {
        ...state,
        newCategoryLoading: false,
        newCategorySuccess: false,
        newCategoryError: true,
        reloadCategories: false,
      };
    default:
      return state;
  }
};
export default labManagerDashReducer;
