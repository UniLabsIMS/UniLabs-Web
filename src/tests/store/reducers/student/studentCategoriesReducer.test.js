import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
} from '../../../../store/actionTypes/studentActionTypes';
import studentCategoriesReducer from '../../../../store/reducers/studentReducers/studentCategoriesReducer';

describe('Student - Borrowed Items Reducer', () => {
  const initialState = {
    categories: [],
    isCategoriesLoading: false,
    isCategoriesError: false,
    reloadCategories: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = studentCategoriesReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles CATEGORIES_LOADING event as expected', () => {
    const reducer = studentCategoriesReducer(initialState, {
      type: CATEGORIES_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isCategoriesLoading: true,
      isCategoriesError: false,
      reloadCategories: false,
    });
  });

  it('handles CATEGORIES_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isCategoriesLoading: true,
      isCategoriesError: false,
      reloadCategories: false,
    };

    const reducer = studentCategoriesReducer(testStartState, {
      type: CATEGORIES_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isCategoriesLoading: false,
      categories: [],
      isCategoriesError: false,
    });
  });

  it('handles CATEGORIES_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isCategoriesLoading: true,
      isCategoriesError: false,
      reloadCategories: false,
    };

    const reducer = studentCategoriesReducer(testStartState, {
      type: CATEGORIES_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isCategoriesLoading: false,
      categories: [],
      isCategoriesError: true,
    });
  });
});
