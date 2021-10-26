import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchCategories,
  addCategory,
  editCategory,
  editCategoryResetState,
  resetLabManagerCategoriesState,
} from '../../../../store/actions/labManager/labManagerCategoriesActions';
import { loggedInLabManager } from '../../../data/loggedInUsers';
import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
  EDIT_CAT_FAIL,
  EDIT_CAT_LOADING,
  EDIT_CAT_RESET_STATE,
  EDIT_CAT_SUCCESS,
  NEW_CAT_FAIL,
  NEW_CAT_LOADING,
  NEW_CAT_SUCCESS,
  RESET_CATEGORIES_STATE,
} from '../../../../store/actionTypes/labManagerActionTypes';
import { categoryResponseData } from '../../../data/categoryResponseData';

const mockStore = configureMockStore([thunk]);

describe('Lab Manager Caregories Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLabManager,
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

      await store.dispatch(fetchCategories());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(CATEGORIES_LOADING);
      expect(actions[1].type).toEqual(CATEGORIES_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches CATEGORIES_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchCategories());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(CATEGORIES_LOADING);
      expect(actions[1].type).toEqual(CATEGORIES_ERROR);
    });
  });

  describe('Add Category', () => {
    it('dispatches NEW_CAT_SUCCESS action and returns data on success', async () => {
      const responseData = categoryResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(addCategory('name', 'desc', null));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(NEW_CAT_LOADING);
      expect(actions[1].type).toEqual(NEW_CAT_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches NEW_CAT_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(addCategory('name', 'desc', null));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(NEW_CAT_LOADING);
      expect(actions[1].type).toEqual(NEW_CAT_FAIL);
    });
  });

  describe('Edit Category', () => {
    it('dispatches EDIT_CAT_SUCCESS action and returns data on success', async () => {
      const responseData = categoryResponseData;

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(editCategory('name', 'desc', null));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(EDIT_CAT_LOADING);
      expect(actions[1].type).toEqual(EDIT_CAT_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches EDIT_CAT_FAIL action on faliure', async () => {
      mockAxios.put.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(editCategory('name', 'desc', null));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(EDIT_CAT_LOADING);
      expect(actions[1].type).toEqual(EDIT_CAT_FAIL);
    });
  });

  describe('Edit Category Reset State', () => {
    it('dispatches EDIT_CAT_RESET_STATE action and reload state', () => {
      store.dispatch(editCategoryResetState(true));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(EDIT_CAT_RESET_STATE);
      expect(actions[0].isReload).toEqual(true);
    });
  });

  describe('Reset State', () => {
    it('dispatches RESET_CATEGORIES_STATE action', () => {
      store.dispatch(resetLabManagerCategoriesState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_CATEGORIES_STATE);
    });
  });
});
