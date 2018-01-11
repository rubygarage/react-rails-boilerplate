import axios from 'axios';
import ApiClient from 'utils/apiClient';
import { normalize } from 'normalize-json-api';
import { takeEvery, call, put } from 'redux-saga/effects';
import watchGetUser, { getUser } from 'sagas/user';
import redirect from 'helpers/redirect';
import response from '../__mocks__/responses/user';

jest.mock('responses/user');

describe('getUser()', () => {
  const params = { params: { id: 1 } };
  const resolve = jest.fn();
  const reject = jest.fn();
  let apiClient;
  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient();
  });

  it('success', () => {
    const saga = getUser({ params, resolve, reject });

    expect(saga.next().value).toEqual(call(apiClient.get, `/api/v1/users/${params.id}`));

    expect(saga.next({ data: response }).value).toEqual(call(normalize, response));

    const normalizedResponse = normalize(response);

    expect(saga.next(normalizedResponse).value).toEqual(put({
      type: 'GET_USER_SUCCESS',
      entities: normalizedResponse.entities,
      results: normalizedResponse.results,
    }));

    expect(saga.next().done).toBe(true);
  });

  it('failure', () => {
    const saga = getUser({ params, resolve, reject });
    const error = new Error('Unexpected Network Error');

    expect(saga.next().value).toEqual(call(apiClient.get, `/api/v1/users/${params.id}`));

    expect(saga.throw(error).value).toEqual(put({ type: 'GET_USER_ERROR', error }));

    expect(saga.next().value).toEqual(call(redirect, '/404', undefined));
  });
});

describe('watcher()', () => {
  it('gets user', () => {
    const watcher = watchGetUser();

    expect(watcher.next().value).toEqual(takeEvery('GET_USER_REQUEST', getUser));

    expect(watcher.next().done).toBe(true);
  });
});
