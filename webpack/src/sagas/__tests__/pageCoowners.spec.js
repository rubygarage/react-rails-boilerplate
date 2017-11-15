jest.mock('responses/pagesUsers')
import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import { updatePageOwnership, watchUpdatePageOwnership, watchGetPageCoowners, getPageCoowners } from 'sagas/pageCoowners'
import { pagesUsers } from 'responses/pagesUsers'

describe('getPageCoowners()', () => {
  const action = { type: 'GET_PAGE_COOWNERS_REQUEST', params: { page_id: '1', role: 'coowner' } }
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = getPageCoowners(action)

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/profile/pages_users', action)
    )

    expect(saga.next(pagesUsers).value).toEqual(
      call(normalize, pagesUsers.data)
    )

    const normalizedResponse = normalize(pagesUsers)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'GET_PAGE_COOWNERS_SUCCESS',
        entities: normalizedResponse.entities,
        results: normalizedResponse.results
      })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = getPageCoowners(action)
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/profile/pages_users', action)
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'GET_PAGE_COOWNERS_ERROR', error })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchGetPageCoowners()

    expect(watcher.next().value).toEqual(
      takeEvery('GET_PAGE_COOWNERS_REQUEST', getPageCoowners)
    )

    expect(watcher.next().done).toBe(true)
  })
})

describe('updatePageOwnership()', () => {
  const params = {
    type: 'UPDATE_PAGE_OWNERSHIP_REQUEST',
    ownership: {
      page_id: '1',
      pages_users: [{ user_id: '2', part: '0.2' }, { user_id: '2', part: '0.5' }]
    }
  }
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('is successfull', () => {
    const saga = updatePageOwnership(params)

    expect(saga.next().value).toEqual(
      call(apiClient.put, '/api/v1/profile/ownership', params)
    )

    expect(saga.next().value).toEqual(
      put({ type: 'UPDATE_PAGE_OWNERSHIP_SUCCESS' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('fails', () => {
    const saga = updatePageOwnership(params)
    const error = new Error('Gospoda! we have an error')

    expect(saga.next().value).toEqual(
      call(apiClient.put, '/api/v1/profile/ownership', params)
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'UPDATE_PAGE_OWNERSHIP_ERROR', error })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watches', () => {
    const watcher = watchUpdatePageOwnership()

    expect(watcher.next().value).toEqual(
      takeEvery('UPDATE_PAGE_OWNERSHIP_REQUEST', updatePageOwnership)
    )

    expect(watcher.next().done).toBe(true)
  })
})
