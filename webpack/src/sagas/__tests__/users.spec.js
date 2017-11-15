jest.mock('responses/users')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchLoadUsers, { loadSearchedUsers, loadUsers, loadUser, loadUserPages } from 'sagas/users'
import { response } from 'responses/users'

describe('loadUsers()', () => {
  const params = { params: {} }
  const resolve = jest.fn()
  const reject = jest.fn()
  let apiClient
  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = loadUsers({ params, resolve, reject })

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/users', params)
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'LOAD_USERS_SUCCESS',
        entities: normalizedResponse.entities,
        users: normalizedResponse.results.users
      })
    )

    expect(saga.next().value).toEqual(
      call(resolve)
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = loadUsers({ params, resolve, reject })
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/users', params)
    )

    expect(saga.throw(error).value).toEqual(
      call(reject, error)
    )

    expect(saga.next().done).toBe(true)
  })
})

describe('loadUser()', () => {
  const params = { params: { id: 1 } }
  const resolve = jest.fn()
  const reject = jest.fn()
  let apiClient
  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = loadUser({ params, resolve, reject })

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/users/${params.id}`)
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'LOAD_USER_SUCCESS',
        entities: normalizedResponse.entities,
        users: normalizedResponse.results.users
      })
    )

    expect(saga.next().value).toEqual(
      call(resolve)
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = loadUser({ params, resolve, reject })
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/users/${params.id}`)
    )

    expect(saga.throw(error).value).toEqual(
      call(reject, error)
    )

    expect(saga.next().done).toBe(true)
  })
})

describe('loadUserPages()', () => {
  const resolve = jest.fn()
  const reject = jest.fn()
  let apiClient
  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = loadUserPages({ resolve, reject })

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/users/pages')
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'LOAD_USER_PAGES_SUCCESS',
        entities: normalizedResponse.entities,
        results: normalizedResponse.results
      })
    )

    expect(saga.next(normalizedResponse).value).toEqual(
      call(resolve, {
        entities: normalizedResponse.entities,
        results: normalizedResponse.results
      })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = loadUserPages({ resolve, reject })
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/users/pages')
    )

    expect(saga.throw(error).value).toEqual(
      call(reject, error)
    )

    expect(saga.next().done).toBe(true)
  })
})

describe('watcher()', () => {
  it('creates a list of watchers', () => {
    const watcher = watchLoadUsers()

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_USERS_REQUEST', loadUsers)
    )

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_USER_REQUEST', loadUser)
    )

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_USER_PAGES_REQUEST', loadUserPages)
    )

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_SEARCHED_USERS_REQUEST', loadSearchedUsers)
    )

    expect(watcher.next().done).toBe(true)
  })
})
