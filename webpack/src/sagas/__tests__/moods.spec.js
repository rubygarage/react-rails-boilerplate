jest.mock('responses/moods')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchLoadMoods, { loadMoods } from 'sagas/moods'
import { response } from 'responses/moods'

describe('loadMoods()', () => {
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = loadMoods()

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/moods')
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'LOAD_MOODS_SUCCESS',
        entities: normalizedResponse.entities,
        results: normalizedResponse.results
      })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = loadMoods()
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/moods')
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'LOAD_MOODS_ERROR' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchLoadMoods()

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_MOODS_REQUEST', loadMoods)
    )

    expect(watcher.next().done).toBe(true)
  })
})
