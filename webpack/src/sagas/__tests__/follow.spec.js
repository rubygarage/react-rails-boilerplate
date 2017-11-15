jest.mock('responses/follow')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import watchToggleFollow, { toggleFollow } from 'sagas/follow'
import { response } from 'responses/eras'

describe('toggleFollow()', () => {
  const action = { owner: { id: 1, entityType: 'pages' } }
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = toggleFollow(action)

    expect(saga.next().value).toEqual(
      call(apiClient.put, `/api/v1/${action.owner.entityType}/${action.owner.id}/follow`)
    )

    expect(saga.next({ data: response }).value).toEqual(
      call(normalize, response)
    )

    const normalizedResponse = normalize(response)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({ type: 'FOLLOW_ENTITY_SUCCESS', entities: normalizedResponse.entities })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = toggleFollow(action)
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.put, `/api/v1/${action.owner.entityType}/${action.owner.id}/follow`)
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'FOLLOW_ENTITY_ERROR', error })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchToggleFollow()

    expect(watcher.next().value).toEqual(
      takeEvery('FOLLOW_ENTITY_REQUEST', toggleFollow)
    )

    expect(watcher.next().done).toBe(true)
  })
})
