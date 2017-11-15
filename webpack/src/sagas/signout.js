import { takeEvery, call, put } from 'redux-saga/effects'
import { SIGN_OUT, REQUEST, SUCCESS, ERROR } from 'constants/actions'
import { deleteTokenFromStorage } from 'utils/tokens'
import { redirect } from 'helpers/redirect'

export function* signOut() {
  try {
    yield call(deleteTokenFromStorage)
    yield put({ type: SIGN_OUT + SUCCESS })
    yield call(redirect, '/')
  } catch (error) {
    yield put({ type: SIGN_OUT + ERROR, error })
  }
}

export default function* watchSignOut() {
  yield takeEvery(SIGN_OUT + REQUEST, signOut)
}
