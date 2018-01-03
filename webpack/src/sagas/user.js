import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import { GET_USER, UPDATE_USER, REQUEST, SUCCESS, ERROR } from 'constants/actions'
import { redirect } from 'helpers/redirect'

export function* getUser({ id }, req = undefined, res = undefined) {
  const apiClient = new ApiClient().buildClient(req)

  try {
    const response = yield call(apiClient.get, `/api/v1/users/${id}`)
    const { entities, results } = yield call(normalize, response.data)
    yield put({ type: GET_USER + SUCCESS, entities, results })
  } catch (error) {
    redirect('/404', res)
    yield put({ type: GET_USER + ERROR, error })
  }
}

export function* updateUser({ values, resolve, reject }) {
  const apiClient = new ApiClient().buildClient()

  try {
    const response = yield call(apiClient.put, `/api/v1/users/${values.id}`, { params: values })
    const { entities, results } = yield call(normalize, response.data)
    yield put({ type: UPDATE_USER + SUCCESS, entities, results })
    yield call(resolve, results)
    yield call(redirect, `/user/${values.id}`)
  } catch (error) {
    yield call(reject, error.response.data)
  }
}

export function* watchGetUser() {
  yield takeEvery(GET_USER + REQUEST, getUser)
}

export function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER + REQUEST, updateUser)
}
