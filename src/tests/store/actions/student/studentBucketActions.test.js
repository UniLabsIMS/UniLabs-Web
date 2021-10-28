import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { waitFor } from '@testing-library/react';
import DisplayItem from '../../../../models/display_item';
import BucketItem from '../../../../models/bucketItem';
import {
  addDisplayItemToBucket,
  increaseItemQunatityinBucket,
  decreaseItemQunatityinBucket,
  addRequest,
  fetchLabLecturers,
} from '../../../../store/actions/student/studentBucketActions';
import { loggedInStudent } from '../../../data/loggedInUsers';
import {
  ADD_TO_BUCKET,
  DECREASE_ITEM_BUCKET_QUNATITY,
  INCREASE_ITEM_BUCKET_QUNATITY,
  REMOVE_FROM_BUCKET,
  STUDENT_BUCKET_LECTURERS_ERROR,
  STUDENT_BUCKET_LECTURERS_LOADED,
  STUDENT_BUCKET_LECTURERS_LOADING,
  REQUEST_CREATE_LOADING,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_ERROR,
} from '../../../../store/actionTypes/studentActionTypes';
import { studentAddRequestResponseData } from '../../../data/studentAddRequestResponseData';
import { displayItemResponseData } from '../../../data/displayItemResponseData';
import { labLecturerResponseData } from '../../../data/labLecturerResponseData';
import { checkReqStateResponseData } from '../../../data/checkReqStateResponseData';

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

  describe('Fetch Lab Lecturers', () => {
    it('dispatches STUDENT_BUCKET_LECTURERS_LOADED action and returns data on success', async () => {
      const responseData = [labLecturerResponseData];

      mockAxios.get
        .mockImplementationOnce(() => Promise.resolve({ data: responseData }))
        .mockImplementationOnce(() =>
          Promise.resolve({ data: checkReqStateResponseData }),
        );

      await store.dispatch(
        fetchLabLecturers('086fc6e5-2d8f-4760-a7ea-b8781ae4ae86'),
      );

      await waitFor(() => {
        // as we have nested get requests
        const actions = store.getActions();
        expect.assertions(5); // +1 for timeout
        expect(actions[0].type).toEqual(STUDENT_BUCKET_LECTURERS_LOADING);
        expect(actions[1].type).toEqual(STUDENT_BUCKET_LECTURERS_LOADED);
        expect(actions[1].payload.lecturers).toEqual(responseData);
        expect(actions[1].payload.check).toEqual(
          checkReqStateResponseData.state,
        );
      });
    });

    it('dispatches STUDENT_BUCKET_LECTURERS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        fetchLabLecturers('086fc6e5-2d8f-4760-a7ea-b8781ae4ae86'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(STUDENT_BUCKET_LECTURERS_LOADING);
      expect(actions[1].type).toEqual(STUDENT_BUCKET_LECTURERS_ERROR);
    });
  });

  describe('Add Request', () => {
    it('dispatches REQUEST_CREATE_SUCCESS action and returns data on success', async () => {
      const responseData = studentAddRequestResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
          payload: [],
        }),
      );

      await store.dispatch(
        addRequest(
          'cbe296d8-e3a9-404e-b4d7-5eee3c40434f',
          '5a1e9140-e9be-4762-b6c9-e3f726337b28',
          'test reason',
          [],
        ),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(REQUEST_CREATE_LOADING);
      expect(actions[1].type).toEqual(REQUEST_CREATE_SUCCESS);
      expect(actions[1].payload).toEqual([]);
    });

    it('dispatches REQUEST_CREATE_ERROR action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        addRequest(
          'cbe296d8-e3a9-404e-b4d7-5eee3c40434f',
          '5a1e9140-e9be-4762-b6c9-e3f726337b28',
          'test reason',
          [],
        ),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(REQUEST_CREATE_LOADING);
      expect(actions[1].type).toEqual(REQUEST_CREATE_ERROR);
    });
  });

  describe('Add Display Item to Bucket', () => {
    it('dispatches ADD_TO_BUCKET action and returns data on success', async () => {
      const displayItemObj = new DisplayItem(displayItemResponseData);

      await store.dispatch(addDisplayItemToBucket(displayItemObj));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(ADD_TO_BUCKET);
      expect(actions[0].displayItemObj).toEqual(displayItemObj);
    });
  });

  describe('Increase Item Qunatity in Bucket', () => {
    it('dispatches INCREASE_ITEM_BUCKET_QUNATITY action and returns data on success', async () => {
      const displayItemObj = new DisplayItem(displayItemResponseData);

      await store.dispatch(increaseItemQunatityinBucket(displayItemObj));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(INCREASE_ITEM_BUCKET_QUNATITY);
      expect(actions[0].displayItemObj).toEqual(displayItemObj);
    });
  });

  describe('Decrease Item Qunatity in Bucket', () => {
    const displayItemObj = new DisplayItem(displayItemResponseData);
    it('dispatches REMOVE_FROM_BUCKET action and returns data on success', async () => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInStudent,
        },
        studentLabBucket: {
          bucketItems: [new BucketItem(displayItemResponseData)],
        },
      });
      await store.dispatch(decreaseItemQunatityinBucket(displayItemObj));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(REMOVE_FROM_BUCKET);
      expect(actions[0].displayItemObj).toEqual(displayItemObj);
    });
    it('dispatches DECREASE_ITEM_BUCKET_QUNATITY action and returns data on success', async () => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInStudent,
        },
        studentLabBucket: {
          bucketItems: [],
        },
      });
      await store.dispatch(decreaseItemQunatityinBucket(displayItemObj));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(DECREASE_ITEM_BUCKET_QUNATITY);
      expect(actions[0].displayItemObj).toEqual(displayItemObj);
    });
  });
});
