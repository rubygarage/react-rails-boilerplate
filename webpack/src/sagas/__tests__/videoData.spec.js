jest.mock('responses/videoData')

import axios from 'axios'
import { takeLatest, call } from 'redux-saga/effects'
import watchVideoData, { getVideoData } from 'sagas/videoData'
import { response } from 'responses/videoData'

describe('getVideoData()', () => {
  const params = {
    values: {
      videoLink: 'https://www.youtube.com/watch?v=4zLfCnGVeL4'
    },
    resolve: jest.fn(),
    reject: jest.fn()
  }

  it('success', () => {
    const saga = getVideoData(params)

    expect(saga.next().value).toEqual(
      call(axios.get, 'https://noembed.com/embed?url=https://www.youtube.com/watch?v=4zLfCnGVeL4')
    )

    expect(saga.next(response).value).toEqual(
      call(params.resolve, response)
    )

    expect(saga.next().done).toBe(true)
  })

  describe('failure', () => {
    describe('when something went wrong', () => {
      it('rejects promise', () => {
        const saga = getVideoData(params)
        const error = new Error('Unexpected Network Error')

        expect(saga.next().value).toEqual(
          call(axios.get, 'https://noembed.com/embed?url=https://www.youtube.com/watch?v=4zLfCnGVeL4')
        )

        expect(saga.throw(error).value).toEqual(
          call(params.reject, { errorCode: 'validation.invalid_link' })
        )

        expect(saga.next().done).toBe(true)
      })
    })

    describe('when error in response from `noembed`', () => {
      it('rejects promise', () => {
        const saga = getVideoData(params)
        const response = { data: { error: 'error' } }

        expect(saga.next().value).toEqual(
          call(axios.get, 'https://noembed.com/embed?url=https://www.youtube.com/watch?v=4zLfCnGVeL4')
        )

        expect(saga.next().value).toEqual(
          call(params.reject, { errorCode: 'validation.invalid_link' })
        )

        expect(saga.next().done).toBe(true)
      })
    })
  })

  it('watcher', () => {
    const watcher = watchVideoData()

    expect(watcher.next().value).toEqual(
      takeLatest('GET_VIDEO_DATA_REQUEST', getVideoData)
    )

    expect(watcher.next().done).toBe(true)
  })
})
