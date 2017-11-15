jest.mock('responses/pageTypes')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchLoadPageTypes, { loadPageTypes } from 'sagas/pageTypes'
import { response } from 'responses/pageTypes'

describe('loadPageTypes()', () => {
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = loadPageTypes()

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/page_types')
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'LOAD_PAGE_TYPES_SUCCESS',
        entities: normalizedResponse.entities,
        results: normalizedResponse.results
      })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = loadPageTypes()
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/page_types')
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'LOAD_PAGE_TYPES_ERROR' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchLoadPageTypes()

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_PAGE_TYPES_REQUEST', loadPageTypes)
    )

    expect(watcher.next().done).toBe(true)
  })
})
