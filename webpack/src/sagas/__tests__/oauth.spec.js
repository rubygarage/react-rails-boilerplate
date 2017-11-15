jest.mock('responses/oauth')

import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchOauth, { signIn, auth } from 'sagas/oauth'
import { response, headers } from 'responses/oauth'
import { localStorageMock } from 'functions/localStorage'
import { setTokenToStorage } from 'utils/tokens'
import { openPopup, removePopupData } from 'utils/popup'
import { browserHistory } from 'react-router'

describe('signIn()', () => {
  const action = {
    type: 'OAUTH_REQUEST', provider: 'twitter'
  }

  it('calls auth()', () => {
    const saga = signIn(action)

    expect(saga.next().value).toEqual(
      call(openPopup, `/omniauth/mobile_${action.provider}`, action.provider)
    )

    expect(saga.next().value).toEqual(
      call(auth)
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = signIn(action)
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(openPopup, `/omniauth/mobile_${action.provider}`, action.provider)
    )

    expect(saga.throw(error).value).toEqual(
      call(removePopupData)
    )

    expect(saga.next().value).toEqual(
      put({ type: 'SIGN_IN_ERROR', error })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchOauth()

    expect(watcher.next().value).toEqual(
      takeEvery('OAUTH_REQUEST', signIn)
    )

    expect(watcher.next().done).toBe(true)
  })
})

describe('auth()', () => {
  it('redirects to registration', () => {
    const saga = auth()
    localStorageMock.setItem('newUser', 'true')

    expect(saga.next().value).toEqual(
      call(browserHistory.push, '/sign_up/omniauth')
    )

    expect(saga.next().done).toBe(true)
  })

  it('success', () => {
    const saga = auth()
    localStorageMock.setItem('newUser', 'false')
    localStorageMock.setItem('tokenInfo', '{ type: "Bearer" }')

    const responseStr = JSON.stringify(response)

    localStorageMock.setItem('userData', responseStr)
    expect(saga.next().value).toEqual(
      call(JSON.parse, localStorage.getItem('userData'))
    )

    expect(saga.next(response).value).toEqual(
      call(JSON.parse, localStorage.getItem('tokenInfo'))
    )

    expect(saga.next(headers).value).toEqual(
      call(setTokenToStorage, headers)
    )

    expect(saga.next().value).toEqual(
      call(removePopupData)
    )

    expect(saga.next().value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'CLEAR_ALL_CARD_LISTS'
      })
    )

    expect(saga.next().value).toEqual(
      put({
        type: 'SIGN_IN_SUCCESS',
        entities: normalizedResponse.entities,
        currentUser: normalizedResponse.results
      })
    )

    expect(saga.next().value).toEqual(
      call(browserHistory.push, '/market')
    )

    expect(saga.next().done).toBe(true)
  })
})
