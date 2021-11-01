import Item from '../../../../models/item';
import {
  ITEMS_ERROR,
  ITEMS_LOADED,
  ITEMS_LOADING,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_LOADING,
  ITEM_DELETE_SUCCESS,
  NEW_ITEM_FAIL,
  NEW_ITEM_LOADING,
  NEW_ITEM_SUCCESS,
  RESET_ITEMS_STATE,
  RESET_NEW_ITEM_STATE,
} from '../../../../store/actionTypes/labAssistantActionTypes';
import labAssistantItemsReducer from '../../../../store/reducers/labAssistantReducers/labAssistantItemsReducer';

describe('Lab Assistant - Items Reducer', () => {
  const initialState = {
    items: [],
    isItemsLoading: false,
    isItemsError: false,
    newItemLoading: false,
    newItemError: false,
    newItemSuccess: false,
    newItemID: null,
    deleteItemLoading: false,
    deleteItemSuccess: false,
    deleteItemError: false,
    reloadItems: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = labAssistantItemsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_ITEMS_STATE event as expected', () => {
    const reducer = labAssistantItemsReducer(initialState, {
      type: RESET_ITEMS_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_NEW_ITEM_STATE event as expected', () => {
    const testStartState = {
      ...initialState,
      newItemLoading: false,
      newItemError: false,
      newItemSuccess: true,
      newItemID: '',
      reloadItems: false,
    };
    const reducer = labAssistantItemsReducer(testStartState, {
      type: RESET_NEW_ITEM_STATE,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newItemLoading: false,
      newItemError: false,
      newItemSuccess: false,
      newItemID: null,
      reloadItems: false,
    });
  });

  it('handles ITEMS_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isItemsLoading: false,
      isItemsError: true,
      reloadItems: false,
    };
    const reducer = labAssistantItemsReducer(testStartState, {
      type: ITEMS_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isItemsLoading: true,
      isItemsError: false,
      reloadItems: false,
    });
  });

  it('handles ITEMS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isItemsLoading: true,
      isItemsError: false,
      reloadItems: false,
    };
    const reducer = labAssistantItemsReducer(testStartState, {
      type: ITEMS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isItemsLoading: false,
      items: [].map(obj => new Item(obj)),
      isItemsError: false,
    });
  });

  it('handles ITEMS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isItemsLoading: true,
      isItemsError: false,
      reloadItems: false,
    };
    const reducer = labAssistantItemsReducer(testStartState, {
      type: ITEMS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isItemsLoading: false,
      items: [],
      isItemsError: true,
    });
  });
  it('handles NEW_ITEM_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      newItemLoading: false,
      isItemsError: false,
      newItemError: false,
      newItemSuccess: false,
      newItemID: '',
      reloadItems: false,
    };
    const reducer = labAssistantItemsReducer(testStartState, {
      type: NEW_ITEM_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newItemLoading: true,
      isItemsError: false,
      newItemError: false,
      newItemSuccess: false,
      newItemID: null,
      reloadItems: false,
    });
  });

  it('handles NEW_ITEM_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      newItemLoading: true,
      isItemsError: false,
      newItemError: false,
      newItemSuccess: false,
      newItemID: null,
      reloadItems: false,
    };
    const reducer = labAssistantItemsReducer(testStartState, {
      type: NEW_ITEM_SUCCESS,
      payload: { id: 'xxx' },
    });

    expect(reducer).toEqual({
      ...testStartState,
      newItemLoading: false,
      newItemSuccess: true,
      reloadItems: true,
      newItemID: 'xxx',
    });
  });

  it('handles NEW_ITEM_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      newItemLoading: true,
      isItemsError: false,
      newItemError: false,
      newItemSuccess: false,
      newItemID: null,
      reloadItems: false,
    };
    const reducer = labAssistantItemsReducer(testStartState, {
      type: NEW_ITEM_FAIL,
      payload: { id: 'xxx' },
    });

    expect(reducer).toEqual({
      ...testStartState,
      newItemLoading: false,
      newItemError: true,
      newItemID: null,
    });
  });
  it('handles ITEM_DELETE_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      deleteItemLoading: false,
      deleteItemError: false,
      deleteItemSuccess: false,
    };
    const reducer = labAssistantItemsReducer(testStartState, {
      type: ITEM_DELETE_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      deleteItemLoading: true,
      deleteItemError: false,
      deleteItemSuccess: false,
    });
  });
  it('handles ITEM_DELETE_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      deleteItemLoading: true,
      deleteItemError: false,
      deleteItemSuccess: false,
    };
    const reducer = labAssistantItemsReducer(testStartState, {
      type: ITEM_DELETE_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      deleteItemLoading: false,
      deleteItemSuccess: true,
      reloadItems: true,
    });
  });
  it('handles ITEM_DELETE_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      deleteItemLoading: true,
      deleteItemError: false,
      deleteItemSuccess: false,
    };
    const reducer = labAssistantItemsReducer(testStartState, {
      type: ITEM_DELETE_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      deleteItemLoading: false,
      deleteItemError: true,
    });
  });
  it('returns current state for invalid action type', () => {
    const reducer = labAssistantItemsReducer(initialState, {
      type: 'Invalid Type',
      isReload: true,
    });
    expect(reducer).toEqual(initialState);
  });
});
