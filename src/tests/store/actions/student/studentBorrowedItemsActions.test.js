import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchStudentBorrowedItems,
  resetStudentBorrowedItemsState,
} from '../../../../store/actions/student/studentBorrowedItemsActions';
import { loggedInStudent } from '../../../data/loggedInUsers';
import {
  STUDENT_BORROWED_ITEMS_ERROR,
  STUDENT_BORROWED_ITEMS_LOADED,
  STUDENT_BORROWED_ITEMS_LOADING,
  RESET_STUDENT_BORROWED_ITEMS_STATE,
} from '../../../../store/actionTypes/studentActionTypes';
import { studentBorrowedItemsResponseData } from '../../../data/studentBorrowedItemsResponseData';

const mockStore = configureMockStore([thunk]);

describe('Student Borrowed Items Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInStudent,
      },
    });
  });

  describe('Fetch Student Borrowed Items', () => {
    it('dispatches STUDENT_BORROWED_ITEMS_LOADED action and returns data on success', async () => {
      const responseData = [studentBorrowedItemsResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchStudentBorrowedItems());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(STUDENT_BORROWED_ITEMS_LOADING);
      expect(actions[1].type).toEqual(STUDENT_BORROWED_ITEMS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches STUDENT_BORROWED_ITEMS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchStudentBorrowedItems());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(STUDENT_BORROWED_ITEMS_LOADING);
      expect(actions[1].type).toEqual(STUDENT_BORROWED_ITEMS_ERROR);
    });
  });

  describe('Reset Student Borrowed Items State', () => {
    it('dispatches RESET_LAB_ASSISTANT_STATE action', () => {
      store.dispatch(resetStudentBorrowedItemsState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_STUDENT_BORROWED_ITEMS_STATE);
    });
  });
});
