import ApiClient from 'utils/apiClient'
import { takeEvery, call, put } from 'redux-saga/effects'
import { redirect } from 'helpers/redirect'
import { GET_EMAIL_CONFIRMATION, REQUEST, SUCCESS, ERROR } from 'constants/actions'

export function* emailConfirmation({ confirmation_token }, res) {
  const apiClient = new ApiClient().buildClient()

  try {
    yield call(apiClient.post, '/api/v1/auth/users/confirmation', { confirmation_token })
    yield put({ type: GET_EMAIL_CONFIRMATION + SUCCESS })
  } catch (error) {
    yield put({ type: GET_EMAIL_CONFIRMATION + ERROR })
    yield call(redirect, '/404', res)
  }
}

export default function* watchEmailConfirmation() {
  yield takeEvery(GET_EMAIL_CONFIRMATION + REQUEST, emailConfirmation)
}
