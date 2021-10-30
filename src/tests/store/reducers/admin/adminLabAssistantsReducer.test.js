import {
  LAB_ASSISTANTS_ERROR,
  LAB_ASSISTANTS_LOADED,
  LAB_ASSISTANTS_LOADING,
  NEW_LAB_ASSISTANT_FAIL,
  NEW_LAB_ASSISTANT_LOADING,
  NEW_LAB_ASSISTANT_SUCCESS,
  RESET_LAB_ASSISTANT_STATE,
  LAB_ASSISTANT_BLOCK_UNBLOCK_LOADING,
  LAB_ASSISTANT_BLOCK_UNBLOCK_SUCCESS,
  LAB_ASSISTANT_BLOCK_UNBLOCK_ERROR,
} from '../../../../store/actionTypes/adminActionTypes';

import adminLabAssistantsReducer from '../../../../store/reducers/adminReducers/adminLabAssistantsReduer.js';

describe('Admin - Department Reducer', () => {
  const initialState = {
    labAssistants: [],
    isLabAssistantsLoading: false,
    isLabAssistantsError: false,
    newLabAssistantLoading: false,
    newLabAssistantError: false,
    newLabAssistantSuccess: false,
    reloadLabAssistants: false,
    labAssistantBlockUnblockLoading: false,
    labAssistantBlockUnblockSuccess: false,
    labAssistantBlockUnblockError: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = adminLabAssistantsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_LAB_ASSISTANT_STATE event as expected', () => {
    const reducer = adminLabAssistantsReducer(initialState, {
      type: RESET_LAB_ASSISTANT_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles LAB_ASSISTANTS_LOADING event as expected', () => {
    const reducer = adminLabAssistantsReducer(initialState, {
      type: LAB_ASSISTANTS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isLabAssistantsLoading: true,
      isLabAssistantsError: false,
      reloadLabAssistant: false,
      labAssistantBlockUnblockLoading: false,
      labAssistantBlockUnblockSuccess: false,
      labAssistantBlockUnblockError: false,
    });
  });

  it('handles DEPARTMENT_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabAssistantsLoading: true,
      isLabAssistantsError: false,
      reloadLabAssistant: false,
      labAssistantBlockUnblockLoading: false,
      labAssistantBlockUnblockSuccess: false,
      labAssistantBlockUnblockError: false,
    };

    const reducer = adminLabAssistantsReducer(testStartState, {
      type: LAB_ASSISTANTS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabAssistantsLoading: false,
      labAssistants: [],
      isLabAssistantsError: false,
    });
  });

  it('handles Departments_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabAssistantsLoading: true,
      isLabAssistantsError: false,
      reloadLabAssistant: false,
      labAssistantBlockUnblockLoading: false,
      labAssistantBlockUnblockSuccess: false,
      labAssistantBlockUnblockError: false,
    };

    const reducer = adminLabAssistantsReducer(testStartState, {
      type: LAB_ASSISTANTS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabAssistantsLoading: false,
      labAssistants: [],
      isLabAssistantsError: true,
    });
  });

  it('handles NEW_LAB_ASSISTANT_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabAssistantsError: false,
      newLabAssistantError: true,
      newLabAssistantSuccess: false,
    };

    const reducer = adminLabAssistantsReducer(testStartState, {
      type: NEW_LAB_ASSISTANT_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLabAssistantLoading: true,
      isLabAssistantsError: false,
      newLabAssistantError: false,
      newLabAssistantSuccess: false,
      reloadLabAssistants: false,
      labAssistantBlockUnblockLoading: false,
      labAssistantBlockUnblockSuccess: false,
      labAssistantBlockUnblockError: false,
    });
  });

  it('handles NEW_LAB_ASSISTANT_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      newLabAssistantLoading: true,
      isLabAssistantsError: false,
      newLabAssistantError: false,
      newLabAssistantSuccess: false,
      reloadLabAssistants: false,
      labAssistantBlockUnblockLoading: false,
      labAssistantBlockUnblockSuccess: false,
      labAssistantBlockUnblockError: false,
    };

    const reducer = adminLabAssistantsReducer(testStartState, {
      type: NEW_LAB_ASSISTANT_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLabAssistantLoading: false,
      newLabAssistantSuccess: true,
      reloadLabAssistants: true,
    });
  });

  it('handles NEW_LAB_ASSISTANT_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      newLabAssistantLoading: true,
      isLabAssistantsError: false,
      newLabAssistantError: false,
      newLabAssistantSuccess: false,
      reloadLabAssistants: false,
      labAssistantBlockUnblockLoading: false,
      labAssistantBlockUnblockSuccess: false,
      labAssistantBlockUnblockError: false,
    };

    const reducer = adminLabAssistantsReducer(testStartState, {
      type: NEW_LAB_ASSISTANT_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLabAssistantLoading: false,
      newLabAssistantError: true,
    });
  });

  it('handles LAB_ASSISTANT_BLOCK_UNBLOCK_LOADING event as expected', () => {
    const reducer = adminLabAssistantsReducer(initialState, {
      type: LAB_ASSISTANT_BLOCK_UNBLOCK_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      labAssistantBlockUnblockLoading: true,
      labAssistantBlockUnblockSuccess: false,
      labAssistantBlockUnblockError: false,
      newLabAssistantLoading: false,
      newLabAssistantError: false,
      newLabAssistantSuccess: false,
    });
  });

  it('handles LAB_ASSISTANT_BLOCK_UNBLOCK_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      labAssistantBlockUnblockLoading: true,
      labAssistantBlockUnblockSuccess: false,
      labAssistantBlockUnblockError: false,
      newLabAssistantLoading: false,
      newLabAssistantError: false,
      newLabAssistantSuccess: false,
    };

    const reducer = adminLabAssistantsReducer(testStartState, {
      type: LAB_ASSISTANT_BLOCK_UNBLOCK_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      labAssistants: Array.updatedArray,
      labAssistantBlockUnblockLoading: false,
      labAssistantBlockUnblockSuccess: true,
      labAssistantBlockUnblockError: false,
    });
  });

  it('handles LAB_ASSISTANT_BLOCK_UNBLOCK_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      labAssistantBlockUnblockLoading: true,
      labAssistantBlockUnblockSuccess: false,
      labAssistantBlockUnblockError: false,
      newLabAssistantLoading: false,
      newLabAssistantError: false,
      newLabAssistantSuccess: false,
    };

    const reducer = adminLabAssistantsReducer(testStartState, {
      type: LAB_ASSISTANT_BLOCK_UNBLOCK_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      labAssistantBlockUnblockLoading: false,
      labAssistantBlockUnblockSuccess: false,
      labAssistantBlockUnblockError: true,
    });
  });
});
