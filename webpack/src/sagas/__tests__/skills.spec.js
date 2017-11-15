jest.mock('responses/skills')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchLoadSkills, { loadSkills } from 'sagas/skills'
import { response } from 'responses/skills'

describe('loadSkills()', () => {
  let apiClient
  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = loadSkills()

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/skills')
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'LOAD_SKILLS_SUCCESS',
        entities: normalizedResponse.entities,
        results: normalizedResponse.results
      })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = loadSkills()
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/skills')
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'LOAD_SKILLS_ERROR' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchLoadSkills()

    expect(watcher.next().value).toEqual(
      takeEvery('LOAD_SKILLS_REQUEST', loadSkills)
    )

    expect(watcher.next().done).toBe(true)
  })
})
