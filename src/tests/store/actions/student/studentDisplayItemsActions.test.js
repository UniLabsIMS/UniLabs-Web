import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchDisplayItems } from '../../../../store/actions/student/studentDisplayItemsActions';
import { loggedInStudent } from '../../../data/loggedInUsers';
import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
} from '../../../../store/actionTypes/studentActionTypes';
import { displayItemResponseData } from '../../../data/displayItemResponseData';

const mockStore = configureMockStore([thunk]);

describe('Student Display Items Actions', () => {
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
    it('dispatches DISPLAY_ITEMS_LOADED action and returns data on success', async () => {
      const responseData = [displayItemResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        fetchDisplayItems('b946f0b4-958a-4a2a-910a-a783dbc2d993'),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(DISPLAY_ITEMS_LOADING);
      expect(actions[1].type).toEqual(DISPLAY_ITEMS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches DISPLAY_ITEMS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        fetchDisplayItems('b946f0b4-958a-4a2a-910a-a783dbc2d993'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(DISPLAY_ITEMS_LOADING);
      expect(actions[1].type).toEqual(DISPLAY_ITEMS_ERROR);
    });
  });
});
