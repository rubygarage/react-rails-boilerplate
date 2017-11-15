import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeLatest, call, put } from 'redux-saga/effects'
import watchRequestAnInvite, { invitationRequest } from 'sagas/requestInvite'
jest.mock('responses/invitationRequest')
import { invitation } from 'responses/invitationRequest'

describe('invitation request saga', () => {
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  describe('invitationRequest()', () => {
    const action = {
      type: 'REQUEST_AN_INVITE',
      params: {
        email: 'a@b.com',
        link: 'googleminus.com/www',
        alpha_2_code: 'ua',
        role: 'free',
        media_type: 'art'
      },
      resolve: jest.fn(),
      reject: jest.fn()
    }

    it('success', () => {
      const saga = invitationRequest(action)

      expect(saga.next().value).toEqual(
        call(apiClient.post, '/api/v1/invitation_requests', { invitation_request: action.params })
      )

      expect(saga.next(invitation).value).toEqual(
        call(normalize, invitation.data)
      )

      const normalizedResponse = normalize(invitation)

      expect(saga.next(normalizedResponse).value).toEqual(
        put({
          type: 'REQUEST_AN_INVITE_SUCCESS',
          entities: normalizedResponse.entities,
          results: normalizedResponse.results
        })
      )

      expect(saga.next(action).value).toEqual(
        call(action.resolve)
      )

      expect(saga.next().done).toBe(true)
    })

    it('failure', () => {
      const saga = invitationRequest(action)
      const error = { response: { data: 'Error' } }

      expect(saga.next().value).toEqual(
        call(apiClient.post, '/api/v1/invitation_requests', { invitation_request: action.params })
      )

      expect(saga.throw(error).value).toEqual(
        put({ type: 'REQUEST_AN_INVITE_ERROR', error })
      )

      expect(saga.next().value).toEqual(
        call(action.reject, error.response.data)
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('watcher', () => {
    it('watchRequestAnInvite()', () => {
      const watcher = watchRequestAnInvite()

      expect(watcher.next().value).toEqual(
        takeLatest('REQUEST_AN_INVITE', invitationRequest)
      )

      expect(watcher.next().done).toBe(true)
    })
  })
})
