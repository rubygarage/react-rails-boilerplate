jest.mock('responses/imageFromUrl')

import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { takeLatest, call, put } from 'redux-saga/effects'
import watchImageFromUrl, { getImageFromUrl } from 'sagas/imageFromUrl'
import { response } from 'responses/imageFromUrl'

describe('getImageFromUrl()', () => {
  const action = {
    type: 'GET_IMAGE_FROM_URL_REQUEST',
    values: {
      imageUrl: 'http://www.w3schools.com/css/img_lights.jpg'
    },
    resolve: jest.fn(),
    reject: jest.fn()
  }
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = getImageFromUrl(action)

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/attachments/card_image/new?image_preview[image_url]=${action.values.imageUrl}`)
    )

    expect(saga.next(response).value).toEqual(
      put({
        type: 'GET_IMAGE_FROM_URL_SUCCESS',
        cardImage: { previewUrl: 'http://www.w3schools.com/css/img_lights.jpg' }
      })
    )

    expect(saga.next().value).toEqual(
      call(action.resolve, response.data.cardImages)
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = getImageFromUrl(action)
    const error = { response: { data: 'Error' } }

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/attachments/card_image/new?image_preview[image_url]=${action.values.imageUrl}`)
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'GET_IMAGE_FROM_URL_ERROR' })
    )

    expect(saga.next().value).toEqual(
      call(action.reject, error.response.data)
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchImageFromUrl()

    expect(watcher.next().value).toEqual(
      takeLatest('GET_IMAGE_FROM_URL_REQUEST', getImageFromUrl)
    )

    expect(watcher.next().done).toBe(true)
  })
})
