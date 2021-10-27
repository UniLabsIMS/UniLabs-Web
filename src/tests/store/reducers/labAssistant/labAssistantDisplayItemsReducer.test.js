import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
  RESET_DISPLAY_ITEMS_STATE,
} from '../../../../store/actionTypes/labAssistantActionTypes';
import labAssistantDisplayItemsReducer from '../../../../store/reducers/labAssistantReducers/labAssistantDisplayItemsReducer';

describe('Lab Assistant - Display Items Reducer', () => {
  const initialState = {
    displayItems: [],
    isDisplayItemsLoading: false,
    isDisplayItemsError: false,
    reloadDisplayItems: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = labAssistantDisplayItemsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_DISPLAY_ITEMS_STATE event as expected', () => {
    const reducer = labAssistantDisplayItemsReducer(initialState, {
      type: RESET_DISPLAY_ITEMS_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles DISPLAY_ITEMS_LOADING event as expected', () => {
    const reducer = labAssistantDisplayItemsReducer(initialState, {
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

    const reducer = labAssistantDisplayItemsReducer(testStartState, {
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

    const reducer = labAssistantDisplayItemsReducer(testStartState, {
      type: DISPLAY_ITEMS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isDisplayItemsLoading: false,
      displayItems: [],
      isDisplayItemsError: true,
    });
  });
  it('return current state in case of invalid type', () => {
    const testStartState = {
      ...initialState,
      isDisplayItemsLoading: false,
      displayItems: [],
      isDisplayItemsError: true,
    };

    const reducer = labAssistantDisplayItemsReducer(testStartState, {
      type: 'Invalid Type',
    });

    expect(reducer).toEqual(testStartState);
  });
});
