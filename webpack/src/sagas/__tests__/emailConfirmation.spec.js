import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { takeEvery, call, put } from 'redux-saga/effects'
import { redirectToNotFound } from 'helpers/redirect'
import watchEmailConfirmation, { emailConfirmation } from 'sagas/emailConfirmation'

describe('emailConfirmation()', () => {
  const action = { confirmation_token: '1234' }
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = emailConfirmation(action)

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/auth/users/confirmation', { confirmation_token: action.confirmation_token })
    )

    expect(saga.next().value).toEqual(
      put({ type: 'GET_EMAIL_CONFIRMATION_SUCCESS' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = emailConfirmation(action)
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/auth/users/confirmation', { confirmation_token: action.confirmation_token })
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'GET_EMAIL_CONFIRMATION_ERROR' })
    )

    expect(saga.next().value).toEqual(
      call(redirectToNotFound, undefined)
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchEmailConfirmation()

    expect(watcher.next().value).toEqual(
      takeEvery('GET_EMAIL_CONFIRMATION_REQUEST', emailConfirmation)
    )

    expect(watcher.next().done).toBe(true)
  })
})
