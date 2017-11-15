import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { takeLatest, call, put } from 'redux-saga/effects'
import watchContactUs, { contactUs } from 'sagas/contactUs'

describe('invitation reques saga', () => {
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  describe('contactUs()', () => {
    const action = {
      type: 'CONTACT_US_REQUEST',
      params: {
        email: 'a@b.com',
        phone: '555-5555',
        first_name: 'First',
        last_name: 'Last',
        message: 'Consequuntur repellendus et impedit aut ipsam est neque'
      },
      resolve: jest.fn(),
      reject: jest.fn()
    }

    it('success', () => {
      const saga = contactUs(action)

      expect(saga.next().value).toEqual(
        call(apiClient.post, '/api/v1/contact_us_message', { contact_us: action.params })
      )

      expect(saga.next().value).toEqual(
        put({
          type: 'CONTACT_US_SUCCESS'
        })
      )

      expect(saga.next(action).value).toEqual(
        call(action.resolve)
      )

      expect(saga.next().done).toBe(true)
    })

    it('failure', () => {
      const saga = contactUs(action)
      const error = { response: { data: 'Error' } }

      expect(saga.next().value).toEqual(
        call(apiClient.post, '/api/v1/contact_us_message', { contact_us: action.params })
      )

      expect(saga.throw(error).value).toEqual(
        put({ type: 'CONTACT_US_ERROR', error })
      )

      expect(saga.next().value).toEqual(
        call(action.reject, error.response.data)
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('watcher', () => {
    it('watchContactUs()', () => {
      const watcher = watchContactUs()

      expect(watcher.next().value).toEqual(
        takeLatest('CONTACT_US_REQUEST', contactUs)
      )

      expect(watcher.next().done).toBe(true)
    })
  })
})
