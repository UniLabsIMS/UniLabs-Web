import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
  RESET_CATEGORIES_STATE,
} from '../../../../store/actionTypes/labAssistantActionTypes';
import labAssistantCategoriesReducer from '../../../../store/reducers/labAssistantReducers/labAssistantCategoriesReducer';

describe('Lab Assistant - Categories Reducer', () => {
  const initialState = {
    categories: [],
    isCategoriesLoading: false,
    isCategoriesError: false,
    reloadCategories: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = labAssistantCategoriesReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_CATEGORIES_STATE event as expected', () => {
    const reducer = labAssistantCategoriesReducer(initialState, {
      type: RESET_CATEGORIES_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles CATEGORIES_LOADING event as expected', () => {
    const reducer = labAssistantCategoriesReducer(initialState, {
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

    const reducer = labAssistantCategoriesReducer(testStartState, {
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

    const reducer = labAssistantCategoriesReducer(testStartState, {
      type: CATEGORIES_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isCategoriesLoading: false,
      categories: [],
      isCategoriesError: true,
    });
  });
  it('return current state in case of invalid type', () => {
    const testStartState = {
      ...initialState,
      isCategoriesLoading: false,
      categories: [],
      isCategoriesError: true,
    };

    const reducer = labAssistantCategoriesReducer(testStartState, {
      type: 'Invalid Type',
    });

    expect(reducer).toEqual(testStartState);
  });
});
