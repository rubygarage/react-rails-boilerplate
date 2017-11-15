import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { takeEvery, call, put } from 'redux-saga/effects'
import { getInviteeData, updateInviteeData, watchInviteeData, watchUpdateInviteeData } from 'sagas/ambassadorInvitation'
import { getInviteeResponse, updateInviteeResponse } from 'responses/ambassadorInvitation'

describe('getInviteeData()', () => {
  const action = { type: 'GET_INVITEE_DATA_REQUEST', params: { invitations_token: '12345678' } }
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = getInviteeData(action)

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/invitations/ambassador_invitation', action.params)
    )

    expect(saga.next(getInviteeResponse).value).toEqual(
      put({
        type: 'GET_INVITEE_DATA_SUCCESS',
        inviteeUsername: getInviteeResponse.data.data.attributes.username
      })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = getInviteeData(action)
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/invitations/ambassador_invitation', action.params)
    )

    expect(saga.throw(error).value).toEqual(
      put({
        type: 'GET_INVITEE_DATA_ERROR',
        error
      })
    )
  })

  it('watcher', () => {
    const watcher = watchInviteeData()

    expect(watcher.next().value).toEqual(
      takeEvery('GET_INVITEE_DATA_REQUEST', getInviteeData)
    )

    expect(watcher.next().done).toBe(true)
  })
})

describe('updateInviteeData()', () => {

  const resolve = jest.fn()
  const reject = jest.fn()
  const invitee = { invitation_token: '1234', location: 'UA' }
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = updateInviteeData({ invitee, resolve, reject })

    expect(saga.next().value).toEqual(
      call(apiClient.put, '/api/v1/auth/invitation', { invitation_token: invitee.invitation_token, user: invitee })
    )

    expect(saga.next(updateInviteeResponse).value).toEqual(
      put({
        type: 'UPDATE_INVITEE_DATA_SUCCESS',
        response: updateInviteeResponse
      })
    )

    expect(saga.next().value).toEqual(
      call(resolve)
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = updateInviteeData({ invitee, resolve, reject })
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.put, '/api/v1/auth/invitation', { invitation_token: invitee.invitation_token, user: invitee })
    )

    expect(saga.throw(error).value).toEqual(
      call(reject, error)
    )
  })

  it('watcher', () => {
    const watcher = watchUpdateInviteeData()

    expect(watcher.next().value).toEqual(
      takeEvery('UPDATE_INVITEE_DATA_REQUEST', updateInviteeData)
    )

    expect(watcher.next().done).toBe(true)
  })
})
