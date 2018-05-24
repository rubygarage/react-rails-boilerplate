import ApiClient from 'utils/apiClient';
// import { normalize } from 'normalize-json-api';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SIGN_IN, REQUEST, SUCCESS, ERROR } from 'constants/actions';
import { setTokenToStorage } from 'utils/tokens';
import redirect from 'helpers/redirect';

export function* signIn({ values, resolve, reject }) {
  const apiClient = new ApiClient().buildClient();

  try {
    const response = yield call(apiClient.post, '/api/v1/session', values);
    // const { entities, results } = yield call(normalize, response.data);

    yield call(setTokenToStorage, response.headers);
    // GET CURRENT USER AFTER THIS!!!
    // yield put({ type: SIGN_IN + SUCCESS, entities, currentUser: results });
    console.log('SIGN_IN', SUCCESS);
    yield call(resolve);
    yield call(redirect, '/');
  } catch (error) {
    yield put({ type: SIGN_IN + ERROR, error });
    yield call(reject, error.response.data);
  }
}

export default function* watchSignIn() {
  yield takeEvery(SIGN_IN + REQUEST, signIn);
}
