import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import { SIGN_IN, OAUTH, REQUEST, SUCCESS, ERROR } from 'constants/actions'
import { setTokenToStorage } from 'utils/tokens'
import { openPopup, removePopupData } from 'utils/popup'

export function* auth() {
  // console.console.log('!!!!!!!! userData: ', localStorage.getItem('userData'))
  debugger
  if (localStorage.getItem('newUser') === 'true') {
    // go to '/sign_up/omniauth'
  } else {
    const response = yield call(JSON.parse, localStorage.getItem('userData'))
    const headers = yield call(JSON.parse, localStorage.getItem('tokenInfo'))

    yield call(setTokenToStorage, headers)
    yield call(removePopupData)

    const { entities, results } = yield call(normalize, response)
    yield put({ type: SIGN_IN + SUCCESS, entities, currentUser: results })
  }
}

export function* signIn({ provider }) {
  try {
    yield call(openPopup, `/omniauth/${provider}`, provider)
    yield call(auth)
  } catch (error) {
    yield call(removePopupData)
    yield put({ type: SIGN_IN + ERROR, error })
    // handle errors
  }
}

export default function* watchOauth() {
  yield takeEvery(OAUTH + REQUEST, signIn)
}
