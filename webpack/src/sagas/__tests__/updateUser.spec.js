import axios from 'axios';
import ApiClient from 'utils/apiClient';
import { normalize } from 'normalize-json-api';
import { takeEvery, call, put } from 'redux-saga/effects';
import watchUpdateUser, { updateUser } from 'sagas/updateUser';
import redirect from 'helpers/redirect';
import response from '../__mocks__/responses/user';

jest.mock('responses/user');

describe('updateUser()', () => {
  const values = { avatar: { image: 'imageFile' } };
  const id = 1;
  const resolve = jest.fn();
  const reject = jest.fn();
  let apiClient;
  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient();
  });

  it('success', () => {
    const saga = updateUser({
      values, id, resolve, reject,
    });

    expect(saga.next().value).toEqual(call(apiClient.put, `/api/v1/users/${id}`, values));

    expect(saga.next({ data: response }).value).toEqual(call(normalize, response));

    const normalizedResponse = normalize(response);

    expect(saga.next(normalizedResponse).value).toEqual(put({
      type: 'UPDATE_USER_SUCCESS',
      entities: normalizedResponse.entities,
      results: normalizedResponse.results,
    }));

    expect(saga.next().value).toEqual(call(resolve, normalizedResponse.results));

    expect(saga.next().value).toEqual(call(redirect, `/user/${id}`));

    expect(saga.next().done).toBe(true);
  });

  it('failure', () => {
    const saga = updateUser({
      values, id, resolve, reject,
    });
    const error = { response: { data: 'Error' } };

    expect(saga.next().value).toEqual(call(apiClient.put, `/api/v1/users/${id}`, values));

    expect(saga.throw(error).value).toEqual(put({ type: 'UPDATE_USER_ERROR', error }));

    expect(saga.next(error).value).toEqual(call(reject, error.response.data));
  });
});

describe('watcher()', () => {
  it('gets user', () => {
    const watcher = watchUpdateUser();

    expect(watcher.next().value).toEqual(takeEvery('UPDATE_USER_REQUEST', updateUser));

    expect(watcher.next().done).toBe(true);
  });
});
