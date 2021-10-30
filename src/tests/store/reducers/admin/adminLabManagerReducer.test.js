import {
  LAB_MANAGERS_ERROR,
  LAB_MANAGERS_LOADED,
  LAB_MANAGERS_LOADING,
  NEW_LAB_MANAGER_FAIL,
  NEW_LAB_MANAGER_LOADING,
  NEW_LAB_MANAGER_SUCCESS,
  RESET_LAB_MANAGER_STATE,
  LAB_MANAGER_BLOCK_UNBLOCK_LOADING,
  LAB_MANAGER_BLOCK_UNBLOCK_SUCCESS,
  LAB_MANAGER_BLOCK_UNBLOCK_ERROR,
} from '../../../../store/actionTypes/adminActionTypes';

import adminLabManagersReducer from '../../../../store/reducers/adminReducers/adminLabManagersReducer';

describe('Admin - Lab Manager Reducer', () => {
  const initialState = {
    labManagers: [],
    isLabManagersLoading: false,
    isLabManagersError: false,
    newLabManagerLoading: false,
    newLabManagerError: false,
    newLabManagerSuccess: false,
    reloadLabManagers: false,
    labManagerBlockUnblockLoading: false,
    labManagerBlockUnblockSuccess: false,
    labManagerBlockUnblockError: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = adminLabManagersReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_LAB_MANAGER_STATE event as expected', () => {
    const reducer = adminLabManagersReducer(initialState, {
      type: RESET_LAB_MANAGER_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles LAB_MANAGERS_LOADING event as expected', () => {
    const reducer = adminLabManagersReducer(initialState, {
      type: LAB_MANAGERS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isLabManagersLoading: true,
      isLabManagersError: false,
      reloadLabManager: false,
      labManagerBlockUnblockLoading: false,
      labManagerBlockUnblockSuccess: false,
      labManagerBlockUnblockError: false,
    });
  });

  it('handles LAB_MANAGERS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabManagersLoading: true,
      isLabManagersError: false,
      reloadLabManager: false,
      labManagerBlockUnblockLoading: false,
      labManagerBlockUnblockSuccess: false,
      labManagerBlockUnblockError: false,
    };

    const reducer = adminLabManagersReducer(testStartState, {
      type: LAB_MANAGERS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabManagersLoading: false,
      labManagers: [],
      isLabManagersError: false,
    });
  });

  it('handles LAB_MANAGERS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabManagersLoading: true,
      isLabManagersError: false,
      reloadLabManager: false,
      labManagerBlockUnblockLoading: false,
      labManagerBlockUnblockSuccess: false,
      labManagerBlockUnblockError: false,
    };

    const reducer = adminLabManagersReducer(testStartState, {
      type: LAB_MANAGERS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabManagersLoading: false,
      labManagers: [],
      isLabManagersError: true,
    });
  });

  it('handles NEW_LAB_MANAGER_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabManagersError: false,
      newLabManagerError: true,
      newLabManagerSuccess: false,
    };

    const reducer = adminLabManagersReducer(testStartState, {
      type: NEW_LAB_MANAGER_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLabManagerLoading: true,
      isLabManagersError: false,
      newLabManagerError: false,
      newLabManagerSuccess: false,
      reloadLabManagers: false,
      labManagerBlockUnblockLoading: false,
      labManagerBlockUnblockSuccess: false,
      labManagerBlockUnblockError: false,
    });
  });

  it('handles NEW_LAB_MANAGER_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      newLabManagerLoading: true,
      isLabManagersError: false,
      newLabManagerError: false,
      newLabManagerSuccess: false,
      reloadLabManagers: false,
      labManagerBlockUnblockLoading: false,
      labManagerBlockUnblockSuccess: false,
      labManagerBlockUnblockError: false,
    };

    const reducer = adminLabManagersReducer(testStartState, {
      type: NEW_LAB_MANAGER_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLabManagerLoading: false,
      newLabManagerSuccess: true,
      reloadLabManagers: true,
    });
  });

  it('handles NEW_LAB_MANAGER_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      newLabManagerLoading: true,
      isLabManagersError: false,
      newLabManagerError: false,
      newLabManagerSuccess: false,
      reloadLabManagers: false,
      labManagerBlockUnblockLoading: false,
      labManagerBlockUnblockSuccess: false,
      labManagerBlockUnblockError: false,
    };

    const reducer = adminLabManagersReducer(testStartState, {
      type: NEW_LAB_MANAGER_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLabManagerLoading: false,
      newLabManagerError: true,
    });
  });

  it('handles LAB_MANAGER_BLOCK_UNBLOCK_LOADING event as expected', () => {
    const reducer = adminLabManagersReducer(initialState, {
      type: LAB_MANAGER_BLOCK_UNBLOCK_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      labManagerBlockUnblockLoading: true,
      labManagerBlockUnblockSuccess: false,
      labManagerBlockUnblockError: false,
      newLabManagerLoading: false,
      newLabManagerError: false,
      newLabManagerSuccess: false,
    });
  });

  it('handles LAB_MANAGER_BLOCK_UNBLOCK_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      labManagerBlockUnblockLoading: true,
      labManagerBlockUnblockSuccess: false,
      labManagerBlockUnblockError: false,
      newLabManagerLoading: false,
      newLabManagerError: false,
      newLabManagerSuccess: false,
    };

    const reducer = adminLabManagersReducer(testStartState, {
      type: LAB_MANAGER_BLOCK_UNBLOCK_SUCCESS,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      labManagers: [],
      labManagerBlockUnblockLoading: false,
      labManagerBlockUnblockSuccess: true,
      labManagerBlockUnblockError: false,
    });
  });

  it('handles LAB_MANAGER_BLOCK_UNBLOCK_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      labManagerBlockUnblockLoading: true,
      labManagerBlockUnblockSuccess: false,
      labManagerBlockUnblockError: false,
      newLabManagerLoading: false,
      newLabManagerError: false,
      newLabManagerSuccess: false,
    };

    const reducer = adminLabManagersReducer(testStartState, {
      type: LAB_MANAGER_BLOCK_UNBLOCK_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      labManagerBlockUnblockLoading: false,
      labManagerBlockUnblockSuccess: false,
      labManagerBlockUnblockError: true,
    });
  });
});
