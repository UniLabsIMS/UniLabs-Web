import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchCategories } from '../../../../store/actions/student/studentCategoriesActions';
import { loggedInStudent } from '../../../data/loggedInUsers';
import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
} from '../../../../store/actionTypes/studentActionTypes';
import { categoryResponseData } from '../../../data/categoryResponseData';

const mockStore = configureMockStore([thunk]);

describe('Student Categories Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInStudent,
      },
    });
  });

  describe('Fetch Categories', () => {
    it('dispatches CATEGORIES_LOADED action and returns data on success', async () => {
      const responseData = [categoryResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        fetchCategories('086fc6e5-2d8f-4760-a7ea-b8781ae4ae86'),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(CATEGORIES_LOADING);
      expect(actions[1].type).toEqual(CATEGORIES_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches CATEGORIES_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        fetchCategories('086fc6e5-2d8f-4760-a7ea-b8781ae4ae86'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(CATEGORIES_LOADING);
      expect(actions[1].type).toEqual(CATEGORIES_ERROR);
    });
  });
});
