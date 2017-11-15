jest.mock('responses/eras')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchLoadEras, { loadEras } from 'sagas/eras'
import { response } from 'responses/eras'

describe('loadEras()', () => {
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = loadEras()

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/eras')
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'LOAD_ERAS_SUCCESS',
        entities: normalizedResponse.entities,
        results: normalizedResponse.results
      })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = loadEras()
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/eras')
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'LOAD_ERAS_ERROR' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchLoadEras()

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_ERAS_REQUEST', loadEras)
    )

    expect(watcher.next().done).toBe(true)
  })
})
