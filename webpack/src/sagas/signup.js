import ApiClient from 'utils/apiClient';
import { normalize } from 'normalize-json-api';
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SIGN_UP, REQUEST, SUCCESS, ERROR } from 'constants/actions';
import redirect from 'helpers/redirect';
import { getOmniauthData } from 'selectors/user';

export function* signUp({ values, resolve, reject }) {
  const apiClient = new ApiClient().buildClient();

  try {
    const oauthData = yield select(getOmniauthData);
    const response = yield call(apiClient.post, '/api/v1/auth/users/registration', { ...oauthData, ...values });
    const { entities, results } = yield call(normalize, response.data);
    yield put({ type: SIGN_UP + SUCCESS, entities, results });

    yield call(resolve, results);
    yield call(redirect, '/sign_up/success');
  } catch (error) {
    yield put({ type: SIGN_UP + ERROR, error });
    yield call(reject, error.response.data);
  }
}

export default function* watchSignUp() {
  yield takeEvery(SIGN_UP + REQUEST, signUp);
}
