import {
  BORROWED_ITEMS_ERROR,
  BORROWED_ITEMS_LOADED,
  BORROWED_ITEMS_LOADING,
  RESET_BORROWED_ITEMS_STATE,
} from '../../../../store/actionTypes/labAssistantActionTypes';
import labAssistantBorrowedItemsReducer from '../../../../store/reducers/labAssistantReducers/labAssistantBorrowedItemsReducer';

describe('Lab Assistant - Borrowed Items Reducer', () => {
  const initialState = {
    borrowedItems: [],
    isborrowedItemsLoading: false,
    isborrowedItemsError: false,
    reloadborrowedItems: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = labAssistantBorrowedItemsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_BORROWED_ITEMS_STATE event as expected', () => {
    const reducer = labAssistantBorrowedItemsReducer(initialState, {
      type: RESET_BORROWED_ITEMS_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles BORROWED_ITEMS_LOADING event as expected', () => {
    const reducer = labAssistantBorrowedItemsReducer(initialState, {
      type: BORROWED_ITEMS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isborrowedItemsLoading: true,
      isborrowedItemsError: false,
      reloadborrowedItems: false,
    });
  });

  it('handles BORROWED_ITEMS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isborrowedItemsLoading: true,
      isborrowedItemsError: false,
      reloadborrowedItems: false,
    };

    const reducer = labAssistantBorrowedItemsReducer(testStartState, {
      type: BORROWED_ITEMS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isborrowedItemsLoading: false,
      borrowedItems: [],
      isborrowedItemsError: false,
    });
  });

  it('handles BORROWED_ITEMS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isborrowedItemsLoading: true,
      isborrowedItemsError: false,
      reloadborrowedItems: false,
    };

    const reducer = labAssistantBorrowedItemsReducer(testStartState, {
      type: BORROWED_ITEMS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isborrowedItemsLoading: false,
      borrowedItems: [],
      isborrowedItemsError: true,
    });
  });
  it('return current state in case of invalid type', () => {
    const testStartState = {
      ...initialState,
      isborrowedItemsLoading: true,
      isborrowedItemsError: false,
      reloadborrowedItems: false,
    };

    const reducer = labAssistantBorrowedItemsReducer(testStartState, {
      type: 'Invalid Type',
    });

    expect(reducer).toEqual(testStartState);
  });
});
