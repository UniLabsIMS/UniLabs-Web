import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchLabAssistantCategories,
  resetLabAssistantCategoriesState,
} from '../../../../store/actions/labAssistant/labAssistantCategoriesActions';
import { loggedInLabAssistant } from '../../../data/loggedInUsers';
import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
  RESET_CATEGORIES_STATE,
} from '../../../../store/actionTypes/labAssistantActionTypes';
import { categoryResponseData } from '../../../data/categoryResponseData';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant Categories Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLabAssistant,
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

      await store.dispatch(fetchLabAssistantCategories());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(CATEGORIES_LOADING);
      expect(actions[1].type).toEqual(CATEGORIES_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches CATEGORIES_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchLabAssistantCategories());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(CATEGORIES_LOADING);
      expect(actions[1].type).toEqual(CATEGORIES_ERROR);
    });
  });

  describe('Reset State', () => {
    it('dispatches RESET_CATEGORIES_STATE action', () => {
      store.dispatch(resetLabAssistantCategoriesState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_CATEGORIES_STATE);
    });
  });
});
