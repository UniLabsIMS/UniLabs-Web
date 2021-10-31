import {
  STUDENT_LABS_ERROR,
  STUDENT_LABS_LOADED,
  STUDENT_LABS_LOADING,
} from '../../../../store/actionTypes/studentActionTypes';
import studentLabsReducer from '../../../../store/reducers/studentReducers/studentLabsReducer';

describe('Student - Lab Reducer', () => {
  const initialState = {
    labs: [],
    departments: [],
    isLabsLoading: false,
    isLabsError: false,
    reloadLabs: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = studentLabsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles STUDENT_LAB_LOADING event as expected', () => {
    const reducer = studentLabsReducer(initialState, {
      type: STUDENT_LABS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isLabsLoading: true,
      isLabsError: false,
      reloadLabs: false,
    });
  });

  it('handles STUDENT_LABS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabsLoading: true,
      isLabsError: false,
      reloadLabs: false,
    };

    const reducer = studentLabsReducer(testStartState, {
      type: STUDENT_LABS_LOADED,
      payload: { labs: [], departments: [] },
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabsLoading: false,
      labs: [],
      departments: [],
      isLabsError: false,
    });
  });

  it('handles STUDENT_LABS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabsLoading: true,
      isLabsError: false,
      reloadLabs: false,
    };

    const reducer = studentLabsReducer(testStartState, {
      type: STUDENT_LABS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabsLoading: false,
      labs: [],
      departments: [],
      isLabsError: true,
    });
  });
});
