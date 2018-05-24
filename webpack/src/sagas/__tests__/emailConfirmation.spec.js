import axios from 'axios';
import ApiClient from 'utils/apiClient';
import { takeEvery, call, put } from 'redux-saga/effects';
import redirect from 'helpers/redirect';
import watchEmailConfirmation, { emailConfirmation } from 'sagas/emailConfirmation';

describe('emailConfirmation()', () => {
  const action = { confirmationToken: '1234' };
  let apiClient;
  let response;

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient();
  });

  it('success', () => {
    const saga = emailConfirmation(action, response);

    expect(JSON.stringify(saga.next().value)).toEqual(JSON.stringify(call(apiClient.get, '/api/v1/users/confirmation', { confirmation_token: action.confirmationToken })));

    expect(saga.next().value).toEqual(put({ type: 'GET_EMAIL_CONFIRMATION_SUCCESS' }));

    expect(saga.next().done).toBe(true);
  });

  it('failure', () => {
    const saga = emailConfirmation(action);
    const error = new Error('Unexpected Network Error');

    expect(JSON.stringify(saga.next().value)).toEqual(JSON.stringify(call(apiClient.get, '/api/v1/users/confirmation', { confirmation_token: action.confirmationToken })));

    expect(saga.throw(error).value).toEqual(put({ type: 'GET_EMAIL_CONFIRMATION_ERROR' }));

    expect(saga.next().value).toEqual(call(redirect, '/404', response));

    expect(saga.next().done).toBe(true);
  });

  it('watcher', () => {
    const watcher = watchEmailConfirmation();

    expect(watcher.next().value).toEqual(takeEvery('GET_EMAIL_CONFIRMATION_REQUEST', emailConfirmation));

    expect(watcher.next().done).toBe(true);
  });
});
