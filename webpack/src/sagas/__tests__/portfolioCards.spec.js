jest.mock('responses/portfolioCards')
import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { normalize } from 'normalize-json-api'
import { takeLatest, call, put } from 'redux-saga/effects'
import { watchGetPortfolioCards, watchGetPortfolioCardsByType, getPortfolioCards } from 'sagas/portfolioCards'
import { portfolioCards } from 'responses/portfolioCards'

describe('getPortfolioCards()', () => {
  const action = { type: 'GET_PORTFOLIO_CARDS_REQUEST', params: { username: 'page-fintone-5', page: 1 } }
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  it('success', () => {
    const saga = getPortfolioCards(action)

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/profile/cards', action)
    )

    expect(saga.next(portfolioCards).value).toEqual(
      call(normalize, portfolioCards.data)
    )

    const normalizedResponse = normalize(portfolioCards)

    expect(saga.next(normalizedResponse).value).toEqual(
      put({
        type: 'GET_PORTFOLIO_CARDS_SUCCESS',
        entities: normalizedResponse.entities,
        results: normalizedResponse.results
      })
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = getPortfolioCards(action)
    const error = new Error('Unexpected Network Error')

    expect(saga.next().value).toEqual(
      call(apiClient.get, '/api/v1/profile/cards', action)
    )

    expect(saga.throw(error).value).toEqual(
      put({ type: 'GET_PORTFOLIO_CARDS_ERROR', error })
    )

    expect(saga.next().done).toBe(true)
  })

  describe('watchers', () => {
    it('portfolio cards', () => {
      const watcher = watchGetPortfolioCards()

      expect(watcher.next().value).toEqual(
        takeLatest('GET_PORTFOLIO_CARDS_REQUEST', getPortfolioCards)
      )

      expect(watcher.next().done).toBe(true)
    })

    it('portfolio cards by type', () => {
      const watcher = watchGetPortfolioCardsByType()

      expect(watcher.next().value).toEqual(
        takeLatest('GET_PORTFOLIO_CARDS_BY_TYPE_REQUEST', getPortfolioCards)
      )

      expect(watcher.next().done).toBe(true)
    })
  })
})
