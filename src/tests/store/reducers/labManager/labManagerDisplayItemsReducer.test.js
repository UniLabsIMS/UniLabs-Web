import DisplayItem from '../../../../models/display_item';
import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
  EDIT_DSP_ITEM_FAIL,
  EDIT_DSP_ITEM_LOADING,
  EDIT_DSP_ITEM_RESET_STATE,
  EDIT_DSP_ITEM_SUCCESS,
  NEW_DSP_ITEM_FAIL,
  NEW_DSP_ITEM_LOADING,
  NEW_DSP_ITEM_SUCCESS,
  RESET_DISPLAY_ITEMS_STATE,
} from '../../../../store/actionTypes/labManagerActionTypes';
import labManagerDisplayItemsReducer from '../../../../store/reducers/labManagerReducers/labManagerDisplayItemsReducer';

describe('labManager - Display Items Reducer', () => {
  const initialState = {
    displayItems: [],
    isDisplayItemsLoading: false,
    isDisplayItemsError: false,
    newDisplayItemLoading: false,
    newDisplayItemError: false,
    newDisplayItemSuccess: false,
    editDisplayItemLoading: false,
    editDisplayItemError: false,
    editDisplayItemSuccess: false,
    reloadDisplayItems: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = labManagerDisplayItemsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_DISPLAY_ITEMS_STATE event as expected', () => {
    const reducer = labManagerDisplayItemsReducer(initialState, {
      type: RESET_DISPLAY_ITEMS_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles DISPLAY_ITEMS_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isDisplayItemsLoading: false,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: DISPLAY_ITEMS_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isDisplayItemsLoading: true,
      isDisplayItemsError: false,
      reloadDisplayItems: false,
    });
  });

  it('handles DISPLAY_ITEMS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isDisplayItemsLoading: true,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: DISPLAY_ITEMS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isDisplayItemsLoading: false,
      displayItems: [].map(obj => new DisplayItem(obj)),
      isDisplayItemsError: false,
    });
  });

  it('handles DISPLAY_ITEMS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isDisplayItemsLoading: true,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: DISPLAY_ITEMS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isDisplayItemsLoading: false,
      displayItems: [],
      isDisplayItemsError: true,
    });
  });

  it('handles NEW_DSP_ITEM_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      newDisplayItemLoading: false,
      isDisplayItemsError: false,
      newDisplayItemError: false,
      newDisplayItemSuccess: true,
      editDisplayItemError: false,
      editDisplayItemSuccess: true,
      reloadDisplayItems: false,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: NEW_DSP_ITEM_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newDisplayItemLoading: true,
      isDisplayItemsError: false,
      newDisplayItemError: false,
      newDisplayItemSuccess: false,
      editDisplayItemError: false,
      editDisplayItemSuccess: false,
      reloadDisplayItems: false,
    });
  });

  it('handles NEW_DSP_ITEM_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      newDisplayItemLoading: true,
      isDisplayItemsError: false,
      newDisplayItemError: false,
      newDisplayItemSuccess: false,
      editDisplayItemError: false,
      editDisplayItemSuccess: false,
      reloadDisplayItems: false,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: NEW_DSP_ITEM_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newDisplayItemLoading: false,
      newDisplayItemSuccess: true,
      reloadDisplayItems: true,
    });
  });

  it('handles NEW_DSP_ITEM_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      newDisplayItemLoading: true,
      isDisplayItemsError: false,
      newDisplayItemError: false,
      newDisplayItemSuccess: false,
      editDisplayItemError: false,
      editDisplayItemSuccess: false,
      reloadDisplayItems: false,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: NEW_DSP_ITEM_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newDisplayItemLoading: false,
      newDisplayItemError: true,
    });
  });

  it('handles EDIT_DSP_ITEM_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      editDisplayItemLoading: false,
      isDisplayItemsError: false,
      editDisplayItemError: false,
      editDisplayItemSuccess: true,
      newDisplayItemError: false,
      newDisplayItemSuccess: true,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: EDIT_DSP_ITEM_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      editDisplayItemLoading: true,
      isDisplayItemsError: false,
      editDisplayItemError: false,
      editDisplayItemSuccess: false,
      newDisplayItemError: false,
      newDisplayItemSuccess: false,
    });
  });

  it('handles EDIT_DSP_ITEM_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      editDisplayItemLoading: true,
      isDisplayItemsError: false,
      editDisplayItemError: false,
      editDisplayItemSuccess: false,
      newDisplayItemError: false,
      newDisplayItemSuccess: false,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: EDIT_DSP_ITEM_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      editDisplayItemLoading: false,
      editDisplayItemSuccess: true,
    });
  });

  it('handles EDIT_DSP_ITEM_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      editDisplayItemLoading: true,
      isDisplayItemsError: false,
      editDisplayItemError: false,
      editDisplayItemSuccess: false,
      newDisplayItemError: false,
      newDisplayItemSuccess: false,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: EDIT_DSP_ITEM_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      editDisplayItemLoading: false,
      editDisplayItemError: true,
    });
  });

  it('handles EDIT_DSP_ITEM_RESET_STATE event as expected', () => {
    const testStartState = {
      ...initialState,
      editDisplayItemLoading: false,
      editDisplayItemError: true,
      editDisplayItemSuccess: false,
      reloadDisplayItems: false,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: EDIT_DSP_ITEM_RESET_STATE,
      isReload: true,
    });

    expect(reducer).toEqual({
      ...testStartState,
      editDisplayItemLoading: false,
      editDisplayItemError: false,
      editDisplayItemSuccess: false,
      reloadDisplayItems: true,
    });
  });

  it('returns current state if passed event is not valis', () => {
    const testStartState = {
      ...initialState,
      editDisplayItemLoading: false,
      editDisplayItemError: true,
      editDisplayItemSuccess: false,
      reloadDisplayItems: false,
    };

    const reducer = labManagerDisplayItemsReducer(testStartState, {
      type: 'Invalid Type',
    });

    expect(reducer).toEqual(testStartState);
  });
});
