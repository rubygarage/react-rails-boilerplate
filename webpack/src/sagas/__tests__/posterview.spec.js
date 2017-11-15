jest.mock('responses/posterview')
import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { redirectToNotFound } from 'helpers/redirect'
import { normalize } from 'normalize-json-api'
import { takeEvery, call, put } from 'redux-saga/effects'
import { getPreviousCard, getNextCard, getPosterviewCard, watchGetPosterviewCard, watchGetNextCard, watchGetPreviousCard } from 'sagas/posterview'
import { posterview } from 'responses/posterview'

describe('getPosterviewCard()', () => {
  const action = { type: 'GET_POSTERVIEW_CARD_REQUEST', params: { mediaName: 'ffffuuuuuu-5', source: 'market' } }
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = getPosterviewCard(action)

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/poster_view/cards/${action.params.mediaName}`)
    )

    expect(saga.next(posterview).value).toEqual(
      call(normalize, posterview.data)
    )

    const normalizedResponse = normalize(posterview)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'GET_POSTERVIEW_CARD_SUCCESS',
        entities: normalizedResponse.entities,
        card: normalizedResponse.results
      })
    )
  })

  it('failure', () => {
    const saga = getPosterviewCard(action)
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/poster_view/cards/${action.params.mediaName}`)
    )

    expect(saga.throw(error).value).toEqual(
      put({ error, type: 'GET_POSTERVIEW_CARD_ERROR' })
    )

    expect(saga.next().value).toEqual(
      call(redirectToNotFound, undefined)
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchGetPosterviewCard()

    expect(watcher.next().value).toEqual(
      takeEvery('GET_POSTERVIEW_CARD_REQUEST', getPosterviewCard)
    )

    expect(watcher.next().done).toBe(true)
  })
})

describe('getNextCard()', () => {
  let apiClient
  const action = {
    params: {
      card: { id: '1' },
      source: 'history',
      filter: {
        params: {
          'filter[username]': 'ozozorro'
        }
      }
    }
  }

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = getNextCard(action)

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/history/cards/${action.params.card.id}/next_card`, action.params.filter)
    )

    expect(saga.next(posterview).value).toEqual(
      call(normalize, posterview.data)
    )

    const normalizedResponse = normalize(posterview)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'GET_NEXT_CARD_SUCCESS',
        entities: normalizedResponse.entities,
        card: normalizedResponse.results
      })
    )
  })

  it('failure', () => {
    const saga = getNextCard(action)
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/history/cards/${action.params.card.id}/next_card`, action.params.filter)
    )

    expect(saga.throw(error).value).toEqual(
      put({ error, type: 'GET_NEXT_CARD_ERROR' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchGetNextCard()

    expect(watcher.next().value).toEqual(
      takeEvery('GET_NEXT_CARD_REQUEST', getNextCard)
    )

    expect(watcher.next().done).toBe(true)
  })
})

describe('getPreviousCard()', () => {
  let apiClient
  const action = {
    params: {
      card: { id: '10' },
      source: 'history',
      filter: {
        params: {
          'filter[username]': 'sk'
        }
      }
    }
  }

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = getPreviousCard(action)

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/history/cards/${action.params.card.id}/previous_card`, action.params.filter)
    )

    expect(saga.next(posterview).value).toEqual(
      call(normalize, posterview.data)
    )

    const normalizedResponse = normalize(posterview)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'GET_PREVIOUS_CARD_SUCCESS',
        entities: normalizedResponse.entities,
        card: normalizedResponse.results
      })
    )
  })

  it('failure', () => {
    const saga = getPreviousCard(action)
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, `/api/v1/history/cards/${action.params.card.id}/previous_card`, action.params.filter)
    )

    expect(saga.throw(error).value).toEqual(
      put({ error, type: 'GET_PREVIOUS_CARD_ERROR' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchGetPreviousCard()

    expect(watcher.next().value).toEqual(
      takeEvery('GET_PREVIOUS_CARD_REQUEST', getPreviousCard)
    )

    expect(watcher.next().done).toBe(true)
  })
})
