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
  RESET_CATEGORIES_STATE,
} from '../../../../store/actionTypes/labManagerActionTypes';
import labManagerCategoriesReducer from '../../../../store/reducers/labManagerReducers/labManagerCategoriesReducer';

describe('labManager - CategoriesReducer', () => {
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

  it('returns the initial state when an action type is not passed', () => {
    const reducer = labManagerCategoriesReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_CATEGORIES_STATE event as expected', () => {
    const reducer = labManagerCategoriesReducer(initialState, {
      type: RESET_CATEGORIES_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles CATEGORIES_LOADING event as expected', () => {
    const reducer = labManagerCategoriesReducer(initialState, {
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

    const reducer = labManagerCategoriesReducer(testStartState, {
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

    const reducer = labManagerCategoriesReducer(testStartState, {
      type: CATEGORIES_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isCategoriesLoading: false,
      categories: [],
      isCategoriesError: true,
    });
  });

  it('handles NEW_CAT_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isCategoriesError: false,
      newCategoryError: true,
      newCategorySuccess: false,
    };

    const reducer = labManagerCategoriesReducer(testStartState, {
      type: NEW_CAT_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newCategoryLoading: true,
      isCategoriesError: false,
      newCategoryError: false,
      newCategorySuccess: false,
      editCategoryError: false,
      editCategorySuccess: false,
      reloadCategories: false,
    });
  });

  it('handles NEW_CAT_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      newCategoryLoading: true,
      isCategoriesError: false,
      newCategoryError: false,
      newCategorySuccess: false,
      editCategoryError: false,
      editCategorySuccess: false,
      reloadCategories: false,
    };

    const reducer = labManagerCategoriesReducer(testStartState, {
      type: NEW_CAT_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newCategoryLoading: false,
      newCategorySuccess: true,
      reloadCategories: true,
    });
  });
  it('handles NEW_CAT_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      newCategoryLoading: true,
      isCategoriesError: false,
      newCategoryError: false,
      newCategorySuccess: false,
      editCategoryError: false,
      editCategorySuccess: false,
      reloadCategories: false,
    };

    const reducer = labManagerCategoriesReducer(testStartState, {
      type: NEW_CAT_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newCategoryLoading: false,
      newCategoryError: true,
    });
  });
  it('handles EDIT_CAT_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      editCategoryLoading: false,
      isCategoriesError: false,
      editCategoryError: false,
      editCategorySuccess: false,
      newCategoryError: true,
      newCategorySuccess: false,
    };

    const reducer = labManagerCategoriesReducer(testStartState, {
      type: EDIT_CAT_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      editCategoryLoading: true,
      isCategoriesError: false,
      editCategoryError: false,
      editCategorySuccess: false,
      newCategoryError: false,
      newCategorySuccess: false,
    });
  });
  it('handles EDIT_CAT_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      editCategoryLoading: true,
      isCategoriesError: false,
      editCategoryError: false,
      editCategorySuccess: false,
      newCategoryError: false,
      newCategorySuccess: false,
    };

    const reducer = labManagerCategoriesReducer(testStartState, {
      type: EDIT_CAT_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      editCategoryLoading: false,
      editCategorySuccess: true,
    });
  });

  it('handles EDIT_CAT_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      editCategoryLoading: true,
      isCategoriesError: false,
      editCategoryError: false,
      editCategorySuccess: false,
      newCategoryError: false,
      newCategorySuccess: false,
    };

    const reducer = labManagerCategoriesReducer(testStartState, {
      type: EDIT_CAT_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      editCategoryLoading: false,
      editCategoryError: true,
    });
  });
  it('handles EDIT_CAT_RESET_STATE event as expected', () => {
    const testStartState = {
      ...initialState,
      editCategoryLoading: true,
      isCategoriesError: false,
      editCategoryError: false,
      editCategorySuccess: false,
      newCategoryError: false,
      newCategorySuccess: false,
    };

    const reducer = labManagerCategoriesReducer(testStartState, {
      type: EDIT_CAT_RESET_STATE,
      isReload: true,
    });

    expect(reducer).toEqual({
      ...testStartState,
      editCategoryLoading: false,
      editCategoryError: false,
      editCategorySuccess: false,
      reloadCategories: true,
    });
  });
  it('returns current state for invalid action type', () => {
    const reducer = labManagerCategoriesReducer(initialState, {
      type: 'Invalid Type',
      isReload: true,
    });

    expect(reducer).toEqual(initialState);
  });
});
