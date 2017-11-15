jest.mock('responses/careers')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchLoadCareers, { loadCareers } from 'sagas/careers'
import { response } from 'responses/careers'

describe('loadCareers()', () => {
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = loadCareers()

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/careers')
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'LOAD_CAREERS_SUCCESS',
        entities: normalizedResponse.entities,
        results: normalizedResponse.results
      })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = loadCareers()
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/careers')
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'LOAD_CAREERS_ERROR' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchLoadCareers()

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_CAREERS_REQUEST', loadCareers)
    )

    expect(watcher.next().done).toBe(true)
  })
})
