jest.mock('responses/countries')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchLoadCountries, { loadCountries } from 'sagas/countries'
import { response } from 'responses/countries'

describe('loadCountries()', () => {
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = loadCountries()

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/countries')
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'LOAD_COUNTRIES_SUCCESS',
        entities: normalizedResponse.entities,
        results: normalizedResponse.results,
        currentCountryCode: response.meta.currentCountryCode
      })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = loadCountries()
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/countries')
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'LOAD_COUNTRIES_ERROR' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchLoadCountries()

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_COUNTRIES_REQUEST', loadCountries)
    )
  })
})
