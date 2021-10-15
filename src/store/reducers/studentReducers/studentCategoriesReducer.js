import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
} from '../../actionTypes/studentActionTypes';
import Category from '../../../models/category';

const initialState = {
  categories: [],
  isCategoriesLoading: false,
  isCategoriesError: false,
  reloadCategories: false,
};

const studentCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
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
export default studentCategoriesReducer;
