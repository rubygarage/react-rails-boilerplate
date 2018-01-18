import { normalize } from 'normalize-json-api';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SIGN_IN, OAUTH, REQUEST, SUCCESS, ERROR } from 'constants/actions';
import { setTokenToStorage } from 'utils/tokens';
import openPopup from 'utils/popup';
import redirect from 'helpers/redirect';

export function* auth(response) {
  if (response.userData) {
    yield call(setTokenToStorage, response.headers);
    const { entities, results } = yield call(normalize, response.userData);
    yield put({ type: SIGN_IN + SUCCESS, entities, currentUser: results });
    yield call(redirect, '/');
  } else {
    throw new Error('No user data');
  }
}

export function* signIn({ provider }) {
  try {
    const response = yield call(openPopup, `/omniauth/${provider}`, provider);
    yield call(auth, response);
  } catch (error) {
    yield put({ type: SIGN_IN + ERROR, error });
  }
}

export default function* watchOauth() {
  yield takeEvery(OAUTH + REQUEST, signIn);
}
