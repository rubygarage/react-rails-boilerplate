import ApiClient from 'utils/apiClient';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SEND_RESTORE_PASSWORD_EMAIL, UPDATE_PASSWORD, REQUEST, SUCCESS, ERROR } from 'constants/actions';
import redirect from 'helpers/redirect';

export function* sendRestorePasswordEmail({ values, resolve, reject }) {
  const apiClient = new ApiClient().buildClient();

  try {
    yield call(apiClient.post, '/api/v1/auth/users/password', values);
    yield put({ type: SEND_RESTORE_PASSWORD_EMAIL + SUCCESS });
    yield call(resolve);
  } catch (error) {
    yield put({ type: SEND_RESTORE_PASSWORD_EMAIL + SUCCESS, error });
    yield call(reject, error.response.data);
  }
}

export function* validateToken(token, res) {
  const apiClient = new ApiClient().buildClient();

  try {
    yield call(apiClient.get, `/api/v1/auth/users/password?reset_token=${token}`);
  } catch (error) {
    yield call(redirect, '/404', res);
  }
}

export function* updatePassword({ values, resolve, reject }) {
  const apiClient = new ApiClient().buildClient();

  try {
    yield call(apiClient.put, '/api/v1/auth/users/password', values);
    yield put({ type: UPDATE_PASSWORD + SUCCESS });
    yield call(resolve);
    yield call(redirect, '/sign_in');
  } catch (error) {
    yield put({ type: UPDATE_PASSWORD + ERROR, error });
    yield call(reject, error.response.data);
  }
}

export function* watchSendRestorePassword() {
  yield takeEvery(SEND_RESTORE_PASSWORD_EMAIL + REQUEST, sendRestorePasswordEmail);
}

export function* watchUpdatePassword() {
  yield takeEvery(UPDATE_PASSWORD + REQUEST, updatePassword);
}
