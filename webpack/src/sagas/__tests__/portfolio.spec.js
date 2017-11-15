jest.mock('responses/portfolio')
import axios from 'axios'
import ApiClient from 'utils/apiClient'
import { redirectToNotFound } from 'helpers/redirect'
import { normalize } from 'normalize-json-api'
import { takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import {
  createPage,
  deletePortfolioAvatar,
  getPortfolio,
  updatePortfolio,
  updatePortfolioAvatar,
  watchCreatePage,
  watchDeletePortfolioAvatar,
  watchGetPortfolioCard,
  watchUpdatePortfolio,
  watchUpdatePortfolioAvatar
} from 'sagas/portfolio'
import { portfolio, page } from 'responses/portfolio'

describe('portfolio saga', () => {
  let apiClient

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient()
  })

  describe('getPortfolio()', () => {
    const action = { type: 'GET_PORTFOLIO_REQUEST', params: { username: 'page-fintone-5' } }

    it('success', () => {
      const saga = getPortfolio(action)

      expect(saga.next().value).toEqual(
        call(apiClient.get, `/api/v1/profile/cards/${action.params.username}`)
      )

      expect(saga.next(portfolio).value).toEqual(
        call(normalize, portfolio.data)
      )

      const normalizedResponse = normalize(portfolio)

      expect(saga.next(normalizedResponse).value).toEqual(
        put({
          type: 'GET_PORTFOLIO_SUCCESS',
          entities: normalizedResponse.entities,
          results: normalizedResponse.results
        })
      )

      expect(saga.next().done).toBe(true)
    })

    it('failure', () => {
      const saga = getPortfolio(action)
      const error = new Error('Unexpected Network Error')

      expect(saga.next().value).toEqual(
        call(apiClient.get, `/api/v1/profile/cards/${action.params.username}`)
      )

      expect(saga.throw(error).value).toEqual(
        put({ type: 'GET_PORTFOLIO_ERROR', error })
      )

      expect(saga.next().value).toEqual(
        call(redirectToNotFound, undefined)
      )

      expect(saga.next().done).toBe(true)
    })

    it('watcher', () => {
      const watcher = watchGetPortfolioCard()

      expect(watcher.next().value).toEqual(
        takeEvery('GET_PORTFOLIO_REQUEST', getPortfolio)
      )

      expect(watcher.next().done).toBe(true)
    })
  })

  describe('createPage()', () => {
    const action = {
      type: 'CREATE_PAGE_REQUEST',
      params: {
        fullname: 'Full Name', media_name: 'page-fintone-5'
      },
      resolve: jest.fn(),
      reject: jest.fn()
    }

    it('success', () => {
      const saga = createPage(action)

      expect(saga.next().value).toEqual(
        call(apiClient.post, '/api/v1/pages', { page: action.params })
      )

      expect(saga.next(page).value).toEqual(
        call(normalize, page.data)
      )

      const normalizedResponse = normalize(page)

      expect(saga.next(normalizedResponse).value).toEqual(
        put({
          type: 'CREATE_PAGE_SUCCESS',
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
      const saga = createPage(action)
      const error = { response: { data: 'Error' } }

      expect(saga.next().value).toEqual(
        call(apiClient.post, '/api/v1/pages', { page: action.params })
      )

      expect(saga.throw(error).value).toEqual(
        put({ type: 'CREATE_PAGE_ERROR', error })
      )

      expect(saga.next().value).toEqual(
        call(action.reject, error.response.data)
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('updatePortfolioAvatar()', () => {
    const action = { type: 'UPDATE_PORTFOLIO_AVATAR_REQUEST', params: { data: new FormData() } }

    it('success', () => {
      const saga = updatePortfolioAvatar(action)

      expect(saga.next().value).toEqual(
        call(apiClient.put, '/api/v1/profile/profile_image', action.params.data)
      )

      expect(saga.next(portfolio).value).toEqual(
        call(normalize, portfolio.data)
      )

      const normalizedResponse = normalize(portfolio)

      expect(saga.next(normalizedResponse).value).toEqual(
        put({
          type: 'UPDATE_PORTFOLIO_AVATAR_SUCCESS',
          entities: normalizedResponse.entities,
          results: normalizedResponse.results
        })
      )

      expect(saga.next().done).toBe(true)
    })

    it('failure', () => {
      const saga = updatePortfolioAvatar(action)
      const error = new Error('Unexpected Network Error')

      expect(saga.next().value).toEqual(
        call(apiClient.put, '/api/v1/profile/profile_image', action.params.data)
      )

      expect(saga.throw(error).value).toEqual(
        put({ type: 'UPDATE_PORTFOLIO_AVATAR_ERROR', error })
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('updatePortfolio()', () => {
    const action = {
      type: 'UPDATE_PORTFOLIO_REQUEST',
      params: { username: 'some_username' },
      owner: { id: 7, type: 'users' },
      resolve: jest.fn(),
      reject: jest.fn()
    }

    it('success', () => {
      const saga = updatePortfolio(action)

      expect(saga.next().value).toEqual(
        call(apiClient.put, `/api/v1/${action.owner.type}/${action.owner.id}`, { user: action.params })
      )

      expect(saga.next(portfolio).value).toEqual(
        call(normalize, portfolio.data)
      )

      const normalizedResponse = normalize(portfolio)

      expect(saga.next(normalizedResponse).value).toEqual(
        put({
          type: 'UPDATE_PORTFOLIO_SUCCESS',
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
      const saga = updatePortfolio(action)
      const error = { response: { data: 'Error' } }

      expect(saga.next().value).toEqual(
        call(apiClient.put, `/api/v1/${action.owner.type}/${action.owner.id}`, { user: action.params })
      )

      expect(saga.throw(error).value).toEqual(
        put({ type: 'UPDATE_PORTFOLIO_ERROR', error })
      )

      expect(saga.next().value).toEqual(
        call(action.reject, error.response.data)
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('deletePortfolioAvatar()', () => {
    const action = { type: 'DELETE_PORTFOLIO_AVATAR_REQUEST', profile_id: '777' }

    it('success', () => {
      const saga = deletePortfolioAvatar(action)

      expect(saga.next().value).toEqual(
        call(apiClient.delete, '/api/v1/profile/profile_image', action)
      )

      expect(saga.next(portfolio).value).toEqual(
        call(normalize, portfolio.data)
      )

      const normalizedResponse = normalize(portfolio)

      expect(saga.next(normalizedResponse).value).toEqual(
        put({
          type: 'DELETE_PORTFOLIO_AVATAR_SUCCESS',
          entities: normalizedResponse.entities,
          results: normalizedResponse.results
        })
      )

      expect(saga.next().done).toBe(true)
    })

    it('failure', () => {
      const saga = deletePortfolioAvatar(action)
      const error = new Error('Unexpected Network Error')

      expect(saga.next().value).toEqual(
        call(apiClient.delete, '/api/v1/profile/profile_image', action)
      )

      expect(saga.throw(error).value).toEqual(
        put({ type: 'DELETE_PORTFOLIO_AVATAR_ERROR', error })
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('watchers', () => {
    it('updatePortfolio()', () => {
      const watcher = watchCreatePage()

      expect(watcher.next().value).toEqual(
        takeLatest('CREATE_PAGE_REQUEST', createPage)
      )

      expect(watcher.next().done).toBe(true)
    })

    it('updatePortfolio()', () => {
      const watcher = watchUpdatePortfolio()

      expect(watcher.next().value).toEqual(
        takeLatest('UPDATE_PORTFOLIO_REQUEST', updatePortfolio)
      )

      expect(watcher.next().done).toBe(true)
    })

    it('updatePortfolioAvatar()', () => {
      const watcher = watchUpdatePortfolioAvatar()

      expect(watcher.next().value).toEqual(
        takeLatest('UPDATE_PORTFOLIO_AVATAR_REQUEST', updatePortfolioAvatar)
      )

      expect(watcher.next().done).toBe(true)
    })

    it('deletePortfolioAvatar()', () => {
      const watcher = watchDeletePortfolioAvatar()

      expect(watcher.next().value).toEqual(
        takeLatest('DELETE_PORTFOLIO_AVATAR_REQUEST', deletePortfolioAvatar)
      )

      expect(watcher.next().done).toBe(true)
    })
  })
})
