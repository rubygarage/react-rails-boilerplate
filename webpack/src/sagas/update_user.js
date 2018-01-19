import ApiClient from 'utils/apiClient';
import { normalize } from 'normalize-json-api';
import { takeEvery, call, put } from 'redux-saga/effects';
import { UPDATE_USER, REQUEST, SUCCESS, ERROR } from 'constants/actions';
import redirect from 'helpers/redirect';

export function* updateUser({
  values, id, resolve, reject,
}) {
  const apiClient = new ApiClient().buildClient();
  try {
    const response = yield call(apiClient.put, `/api/v1/users/${id}`, values);
    console.log('UPDATE USER response');
    console.log(response);
    const { entities, results } = yield call(normalize, response.data);
    yield put({ type: UPDATE_USER + SUCCESS, entities, results });
    yield call(resolve, results);
    // TODO: fix bug when after update user has no avatar before refresh
    yield call(redirect, `/user/${id}`);
  } catch (error) {
    yield put({ type: UPDATE_USER + ERROR, error });
    yield call(reject, error.response.data);
  }
}

export default function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER + REQUEST, updateUser);
}
