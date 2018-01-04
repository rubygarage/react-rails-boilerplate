import axios from 'axios';
import { ApiClient } from 'utils/apiClient';
import {
  watchSendRestorePassword,
  watchUpdatePassword,
  sendRestorePasswordEmail,
  validateToken,
  updatePassword,
} from 'sagas/resetPassword';

import { takeEvery, call, put } from 'redux-saga/effects';
import redirect from 'helpers/redirect';

describe('resetPassword', () => {
  let apiClient;
  const params = {
    values: {},
    resolve: jest.fn(),
    reject: jest.fn(),
  };
  const error = { response: { data: 'Error' } };

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient();
  });

  describe('sendRestorePasswordEmail()', () => {
    it('success', () => {
      const saga = sendRestorePasswordEmail(params);

      expect(saga.next().value).toEqual(call(apiClient.post, '/api/v1/auth/users/password', params.values));

      expect(saga.next().value).toEqual(put({
        type: 'SEND_RESTORE_PASSWORD_EMAIL_SUCCESS',
      }));

      expect(saga.next().value).toEqual(call(params.resolve));

      expect(saga.next().done).toBe(true);
    });

    it('failure', () => {
      const saga = sendRestorePasswordEmail(params);

      expect(saga.next().value).toEqual(call(apiClient.post, '/api/v1/auth/users/password', params.values));

      expect(saga.throw(error).value).toEqual(put({ type: 'SEND_RESTORE_PASSWORD_EMAIL_SUCCESS', error }));

      expect(saga.next().value).toEqual(call(params.reject, error.response.data));

      expect(saga.next().done).toBe(true);
    });
  });

  describe('validateToken()', () => {
    const token = '2s1f32s.ad1f321sdaf.321sda3';
    const res = {};

    it('success', () => {
      const saga = validateToken(token, res);

      expect(saga.next().value).toEqual(call(apiClient.get, `/api/v1/auth/users/password?reset_token=${token}`));
    });

    it('failure', () => {
      const saga = validateToken(token, res);

      expect(saga.next().value).toEqual(call(apiClient.get, `/api/v1/auth/users/password?reset_token=${token}`));

      expect(saga.throw(error).value).toEqual(call(redirect, '/404', res));
    });
  });

  describe('updatePassword()', () => {
    it('success', () => {
      const saga = updatePassword(params);

      expect(JSON.stringify(saga.next().value)).toEqual(JSON.stringify(call(apiClient.post, '/api/v1/auth/users/password', params.values)));

      expect(saga.next().value).toEqual(put({ type: 'UPDATE_PASSWORD_SUCCESS' }));

      expect(saga.next().value).toEqual(call(params.resolve));

      expect(saga.next().value).toEqual(call(redirect, '/sign_in'));

      expect(saga.next().done).toBe(true);
    });

    it('failure', () => {
      const saga = updatePassword(params);

      expect(JSON.stringify(saga.next().value)).toEqual(JSON.stringify(call(apiClient.post, '/api/v1/auth/users/password', params.values)));

      expect(saga.throw(error).value).toEqual(put({ type: 'UPDATE_PASSWORD_ERROR', error }));

      expect(saga.next().value).toEqual(call(params.reject, error.response.data));

      expect(saga.next().done).toBe(true);
    });
  });

  it('watchSendRestorePassword', () => {
    const watcher = watchSendRestorePassword();

    expect(watcher.next().value).toEqual(takeEvery('SEND_RESTORE_PASSWORD_EMAIL_REQUEST', sendRestorePasswordEmail));

    expect(watcher.next().done).toBe(true);
  });

  it('watchUpdatePassword', () => {
    const watcher = watchUpdatePassword();

    expect(watcher.next().value).toEqual(takeEvery('UPDATE_PASSWORD_REQUEST', updatePassword));

    expect(watcher.next().done).toBe(true);
  });
});
