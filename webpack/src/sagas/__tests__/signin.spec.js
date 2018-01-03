jest.mock('responses/signin')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchSignIn, { signIn } from 'sagas/signin'
import { response } from 'responses/signin'
import { redirect } from 'helpers/redirect'
import { setTokenToStorage } from 'utils/tokens'

describe('signIn()', () => {
  let apiClient
  const params = {
    values: {
      username: 'username',
      password: 'password'
    },
    resolve: jest.fn(),
    reject: jest.fn()
  }

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = signIn(params)

    expect(saga.next().value).toEqual(
      call(apiClient.post, '/api/v1/auth/users/session', params.values)
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      call(setTokenToStorage, response.data.headers)
    )

    expect(saga.next().value).toEqual(
      put({
        type: 'SIGN_IN_SUCCESS',
        entities: normalizedResponse.entities,
        currentUser: normalizedResponse.results
      })
    )

    expect(saga.next().value).toEqual(
      call(params.resolve)
    )

    expect(saga.next().value).toEqual(
      call(redirect, '/')
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = signIn(params)
    const error = { response: { data: 'Error' } }

    expect(saga.next().value).toEqual(
      call(apiClient.post, '/api/v1/auth/users/session', params.values)
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'SIGN_IN_ERROR', error })
    )

    expect(saga.next().value).toEqual(
      call(params.reject, error.response.data)
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchSignIn()

    expect(watcher.next().value).toEqual(
      takeEvery('SIGN_IN_REQUEST', signIn)
    )

    expect(watcher.next().done).toBe(true)
  })
})
