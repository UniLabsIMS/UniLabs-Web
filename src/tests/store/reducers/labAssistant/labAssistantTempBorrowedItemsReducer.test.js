import {
  TEMP_BORROWED_ITEMS_ERROR,
  TEMP_BORROWED_ITEMS_LOADED,
  TEMP_BORROWED_ITEMS_LOADING,
  RESET_TEMP_BORROWED_ITEMS_STATE,
} from '../../../../store/actionTypes/labAssistantActionTypes';
import labAssistantTempBorrowedItemsReducer from '../../../../store/reducers/labAssistantReducers/labAssistantTempBorrowedItemsReducer';

describe('Lab Assistant - Temp Borrowed Items Reducer', () => {
  const initialState = {
    tempBorrowedItems: [],
    isTempBorrowedItemsLoading: false,
    isTempBorrowedItemsError: false,
    reloadTempBorrowedItems: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = labAssistantTempBorrowedItemsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_TEMP_BORROWED_ITEMS_STATE event as expected', () => {
    const reducer = labAssistantTempBorrowedItemsReducer(initialState, {
      type: RESET_TEMP_BORROWED_ITEMS_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles TEMP_BORROWED_ITEMS_LOADING event as expected', () => {
    const reducer = labAssistantTempBorrowedItemsReducer(initialState, {
      type: TEMP_BORROWED_ITEMS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isTempBorrowedItemsLoading: true,
      isTempBorrowedItemsError: false,
      reloadTempBorrowedItems: false,
    });
  });

  it('handles TEMP_BORROWED_ITEMS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isTempBorrowedItemsLoading: true,
      isTempBorrowedItemsError: false,
      reloadTempBorrowedItems: false,
    };

    const reducer = labAssistantTempBorrowedItemsReducer(testStartState, {
      type: TEMP_BORROWED_ITEMS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isTempBorrowedItemsLoading: false,
      tempBorrowedItems: [],
      isTempBorrowedItemsError: false,
    });
  });

  it('handles TEMP_BORROWED_ITEMS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isTempBorrowedItemsLoading: true,
      isTempBorrowedItemsError: false,
      reloadTempBorrowedItems: false,
    };

    const reducer = labAssistantTempBorrowedItemsReducer(testStartState, {
      type: TEMP_BORROWED_ITEMS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isTempBorrowedItemsLoading: false,
      tempBorrowedItems: [],
      isTempBorrowedItemsError: true,
    });
  });
  it('return current state in case of invalid type', () => {
    const testStartState = {
      ...initialState,
      isTempBorrowedItemsLoading: false,
      tempBorrowedItems: [],
      isTempBorrowedItemsError: true,
    };

    const reducer = labAssistantTempBorrowedItemsReducer(testStartState, {
      type: 'Invalid Type',
    });

    expect(reducer).toEqual(testStartState);
  });
});
