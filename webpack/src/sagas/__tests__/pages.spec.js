jest.mock('responses/pages')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchLoadPage, { loadPage } from 'sagas/pages'
import { response } from 'responses/pages'

describe('loadPage()', () => {
  const params = { params: { id: 1 } }
  const resolve = jest.fn()
  const reject = jest.fn()
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = loadPage({ params, resolve, reject })

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/pages/${params.id}`)
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'LOAD_PAGE_SUCCESS',
        entities: normalizedResponse.entities,
        pages: normalizedResponse.results.pages
      })
    )

    expect(saga.next().value).toEqual(
      call(resolve)
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = loadPage({ params, resolve, reject })
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/pages/${params.id}`)
    )

    expect(saga.throw(error).value).toEqual(
      call(reject, error)
    )

    expect(saga.next().done).toBe(true)
  })
})

describe('watcher()', () => {
  it('creates a list of watchers', () => {
    const watcher = watchLoadPage()

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_PAGE_REQUEST', loadPage)
    )

    expect(watcher.next().done).toBe(true)
  })
})
