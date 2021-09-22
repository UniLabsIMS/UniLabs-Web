import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
} from '../../actionTypes/labManagerActionTypes';
import Category from '../../../models/category';

const initialState = {
  categories: [],
  isCategoriesLoading: false,
  isCategoriesError: false,
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
    default:
      return state;
  }
};
export default labManagerDashReducer;
