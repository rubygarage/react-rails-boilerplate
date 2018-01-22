import axios from 'axios';
import ApiClient from 'utils/apiClient';
import { normalize } from 'normalize-json-api';
import { takeEvery, call, put } from 'redux-saga/effects';
import watchSignUp, { signUp } from 'sagas/signup';
import redirect from 'helpers/redirect';
import response from '../__mocks__/responses/signup';

jest.mock('responses/signup');

describe('signUp()', () => {
  let apiClient;
  const params = {
    values: {
      email: 'email',
      username: 'username',
      password: 'password',
      password_confirmation: 'password_confirmation',
    },
    resolve: jest.fn(),
    reject: jest.fn(),
  };

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient();
  });

  it('success', () => {
    const saga = signUp(params);

    expect(saga.next().value).toEqual(call(apiClient.post, '/api/v1/auth/users/registration', params.values));

    expect(saga.next({ data: response }).value).toEqual(call(normalize, response));

    const normalizedResponse = normalize(response);

    expect(saga.next(normalizedResponse).value).toEqual(put({
      type: 'SIGN_UP_SUCCESS',
      entities: normalizedResponse.entities,
      results: normalizedResponse.results,
    }));

    expect(saga.next().value).toEqual(call(params.resolve, normalizedResponse.results));

    expect(saga.next().value).toEqual(call(redirect, '/sign_up/success'));

    expect(saga.next().done).toBe(true);
  });

  it('failure', () => {
    const saga = signUp(params);
    const error = { response: { data: 'Error' } };

    expect(saga.next().value).toEqual(call(apiClient.post, '/api/v1/auth/users/registration', params.values));

    expect(saga.throw(error).value).toEqual(put({ type: 'SIGN_UP_ERROR', error }));

    expect(saga.next().value).toEqual(call(params.reject, error.response.data));

    expect(saga.next().done).toBe(true);
  });

  it('watcher', () => {
    const watcher = watchSignUp();

    expect(watcher.next().value).toEqual(takeEvery('SIGN_UP_REQUEST', signUp));

    expect(watcher.next().done).toBe(true);
  });
});
