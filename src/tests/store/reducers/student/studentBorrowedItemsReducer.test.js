import {
  STUDENT_BORROWED_ITEMS_ERROR,
  STUDENT_BORROWED_ITEMS_LOADED,
  STUDENT_BORROWED_ITEMS_LOADING,
  RESET_STUDENT_BORROWED_ITEMS_STATE,
} from '../../../../store/actionTypes/studentActionTypes';
import studentBorrowedItemsReducer from '../../../../store/reducers/studentReducers/studentBorrowedItemsReducer';

describe('Student - Borrowed Items Reducer', () => {
  const initialState = {
    borrowedItems: [],
    isborrowedItemsLoading: false,
    isborrowedItemsError: false,
    reloadborrowedItems: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = studentBorrowedItemsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_STUDENT_BORROWED_ITEMS_STATE event as expected', () => {
    const reducer = studentBorrowedItemsReducer(initialState, {
      type: RESET_STUDENT_BORROWED_ITEMS_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles STUDENT_BORROWED_ITEMS_LOADING event as expected', () => {
    const reducer = studentBorrowedItemsReducer(initialState, {
      type: STUDENT_BORROWED_ITEMS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isborrowedItemsLoading: true,
      isborrowedItemsError: false,
      reloadborrowedItems: false,
    });
  });

  it('handles CATEGORIES_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isborrowedItemsLoading: true,
      isborrowedItemsError: false,
      reloadborrowedItems: false,
    };

    const reducer = studentBorrowedItemsReducer(testStartState, {
      type: STUDENT_BORROWED_ITEMS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isborrowedItemsLoading: false,
      borrowedItems: [],
      isborrowedItemsError: false,
    });
  });

  it('handles STUDENT_BORROWED_ITEMS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isborrowedItemsLoading: true,
      isborrowedItemsError: false,
      reloadborrowedItems: false,
    };

    const reducer = studentBorrowedItemsReducer(testStartState, {
      type: STUDENT_BORROWED_ITEMS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isborrowedItemsLoading: false,
      borrowedItems: [],
      isborrowedItemsError: true,
    });
  });
});
