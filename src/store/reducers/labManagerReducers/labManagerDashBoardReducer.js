import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
  EDIT_CAT_FAIL,
  EDIT_CAT_LOADING,
  EDIT_CAT_RESET_STATE,
  EDIT_CAT_SUCCESS,
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
  editCategoryLoading: false,
  editCategoryError: false,
  editCategorySuccess: false,
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
        editCategoryError: false,
        editCategorySuccess: false,
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
    case EDIT_CAT_LOADING:
      return {
        ...state,
        editCategoryLoading: true,
        isCategoriesError: false,
        editCategoryError: false,
        editCategorySuccess: false,
        newCategoryError: false,
        newCategorySuccess: false,
      };
    case EDIT_CAT_SUCCESS:
      return {
        ...state,
        editCategoryLoading: false,
        editCategorySuccess: true,
      };
    case EDIT_CAT_FAIL:
      return {
        ...state,
        editCategoryLoading: false,
        editCategoryError: true,
      };
    case EDIT_CAT_RESET_STATE:
      return {
        ...state,
        editCategoryLoading: false,
        editCategoryError: false,
        editCategorySuccess: false,
        reloadCategories: action.isReload,
      };
    default:
      return state;
  }
};
export default labManagerDashReducer;
