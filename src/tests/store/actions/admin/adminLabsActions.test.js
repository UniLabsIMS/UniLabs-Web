// import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  // fetchLabs,
  // fetchDeptLabs,
  // addLab,
  // assignLecturer,
  resetAdminLabState,
  resetLabLecturerAssignState,
} from '../../../../store/actions/admin/adminLabsActions';
import { loggedInAdmin } from '../../../data/loggedInUsers';
import {
  // LABS_ERROR,
  // LABS_LOADED,
  // LABS_LOADING,
  // NEW_LAB_FAIL,
  // NEW_LAB_LOADING,
  // NEW_LAB_SUCCESS,
  RESET_LAB_STATE,
  // DEPT_LABS_ERROR,
  // DEPT_LABS_LOADED,
  // DEPT_LABS_LOADING,
  // LAB_ASSIGN_LECTURER_LOADING,
  // LAB_ASSIGN_LECTURER_SUCCESS,
  // LAB_ASSIGN_LECTURER_ERROR,
  LAB_ASSIGN_LECTURER_RESET,
} from '../../../../store/actionTypes/adminActionTypes';
// import { labResponseData } from '../../../data/labResponseData';

const mockStore = configureMockStore([thunk]);

describe('Admin Labs Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInAdmin,
      },
    });
  });

  // describe('Fetch Labs', () => {
  //   it('dispatches LABS_LOADED action and returns data on success', async () => {
  //     const responseData = [labResponseData];

  //     mockAxios.get
  //       .mockImplementationOnce(() => Promise.resolve({ data: responseData }))
  //       .mockImplementationOnce(() => Promise.resolve({ data: [] }));

  //     await store.dispatch(fetchLabs());
  //     const actions = store.getActions();

  //     expect.assertions(4);
  //     expect(actions[0].type).toEqual(LABS_LOADING);
  //     expect(actions[1].type).toEqual(LABS_LOADED);
  //     expect(actions[1].payload.labs).toEqual(responseData);
  //     expect(actions[1].payload.lecturers).toEqual([]);
  //   });

  //   it('dispatches LABS_ERROR action on faliure', async () => {
  //     mockAxios.get.mockRejectedValueOnce(new Error('Error'));

  //     await store.dispatch(fetchLabs());
  //     const actions = store.getActions();

  //     expect.assertions(2);
  //     expect(actions[0].type).toEqual(LABS_LOADING);
  //     expect(actions[1].type).toEqual(LABS_ERROR);
  //   });
  // });

  //   describe('Add new Lab', () => {
  //     it('dispatches NEW_LAB_SUCCESS action and returns data on success', async () => {
  //       const responseData = LabResponseData;

  //       mockAxios.post.mockImplementationOnce(() =>
  //         Promise.resolve({
  //           data: responseData,
  //         }),
  //       );

  //       await store.dispatch(addLab('test@testemail,com', null));
  //       const actions = store.getActions();

  //       expect.assertions(3);
  //       expect(actions[0].type).toEqual(NEW_LAB_LOADING);
  //       expect(actions[1].type).toEqual(NEW_LAB_SUCCESS);
  //       expect(actions[1].payload).toEqual(responseData);
  //     });

  //     it('dispatches NEW_LAB_FAIL action on faliure', async () => {
  //       mockAxios.post.mockRejectedValueOnce(new Error('Error'));

  //       await store.dispatch(addLab('test@testemail,com', null));
  //       const actions = store.getActions();

  //       expect.assertions(2);
  //       expect(actions[0].type).toEqual(NEW_LAB_LOADING);
  //       expect(actions[1].type).toEqual(NEW_LAB_FAIL);
  //     });
  //   });

  //   describe('Block Unblock Lab', () => {
  //     it('dispatches LAB_BLOCK_UNBLOCK_SUCCESS action and returns data on success', async () => {
  //       const responseData = updatedLasManagersResponseData;

  //       mockAxios.post.mockImplementationOnce(() =>
  //         Promise.resolve({
  //           data: responseData,
  //         }),
  //       );

  //       await store.dispatch(
  //         blockUnblockLab('24616094-3cdb-4fbe-850c-562c99179075', true),
  //       );
  //       const actions = store.getActions();

  //       expect.assertions(3);
  //       expect(actions[0].type).toEqual(LAB_BLOCK_UNBLOCK_LOADING);
  //       expect(actions[1].type).toEqual(LAB_BLOCK_UNBLOCK_SUCCESS);
  //       expect(actions[1].payload).toEqual(responseData);
  //     });

  //     it('dispatches NEW_LAB_FAIL action on faliure', async () => {
  //       mockAxios.post.mockRejectedValueOnce(new Error('Error'));

  //       await store.dispatch(
  //         blockUnblockLab('24616094-3cdb-4fbe-850c-562c99179075', true),
  //       );
  //       const actions = store.getActions();

  //       expect.assertions(2);
  //       expect(actions[0].type).toEqual(LAB_BLOCK_UNBLOCK_LOADING);
  //       expect(actions[1].type).toEqual(LAB_BLOCK_UNBLOCK_ERROR);
  //     });
  //   });

  describe('Reset Admin Labs State', () => {
    it('dispatches RESET_LAB_STATE action', () => {
      store.dispatch(resetAdminLabState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_LAB_STATE);
    });
  });

  describe('Reset Lab assign Lecturer State', () => {
    it('dispatches LAB_ASSIGN_LECTURER_RESET action', () => {
      store.dispatch(resetLabLecturerAssignState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(LAB_ASSIGN_LECTURER_RESET);
    });
  });
});
