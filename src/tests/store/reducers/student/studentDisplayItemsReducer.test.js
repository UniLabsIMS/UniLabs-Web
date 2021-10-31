import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
} from '../../../../store/actionTypes/studentActionTypes';
import studentDisplayItemsReducer from '../../../../store/reducers/studentReducers/studentDisplayItemsReducer';

describe('Student - Borrowed Items Reducer', () => {
  const initialState = {
    displayItems: [],
    isDisplayItemsLoading: false,
    isDisplayItemsError: false,
    reloadDisplayItems: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = studentDisplayItemsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles DISPLAY_ITEMS_LOADING event as expected', () => {
    const reducer = studentDisplayItemsReducer(initialState, {
      type: DISPLAY_ITEMS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isDisplayItemsLoading: true,
      isDisplayItemsError: false,
      reloadDisplayItems: false,
    });
  });

  it('handles DISPLAY_ITEMS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isDisplayItemsLoading: true,
      isDisplayItemsError: false,
      reloadDisplayItems: false,
    };

    const reducer = studentDisplayItemsReducer(testStartState, {
      type: DISPLAY_ITEMS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isDisplayItemsLoading: false,
      displayItems: [],
      isDisplayItemsError: false,
    });
  });

  it('handles DISPLAY_ITEMS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isDisplayItemsLoading: true,
      isDisplayItemsError: false,
      reloadDisplayItems: false,
    };

    const reducer = studentDisplayItemsReducer(testStartState, {
      type: DISPLAY_ITEMS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isDisplayItemsLoading: false,
      displayItems: [],
      isDisplayItemsError: true,
    });
  });
});
