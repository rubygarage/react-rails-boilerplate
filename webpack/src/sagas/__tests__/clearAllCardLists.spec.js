import { takeEvery, put } from 'redux-saga/effects'
import watchClearAllCardLists, { clearAllCardLists } from 'sagas/clearAllCardLists'

describe('clearAllCardLists()', () => {
  it('dispatch actions', () => {
    const saga = clearAllCardLists()

    expect(saga.next().value).toEqual(
      put({ type: 'SET_MARKET_INITIAL_STATE' })
    )

    expect(saga.next().value).toEqual(
      put({ type: 'SET_HOME_INITIAL_STATE' })
    )

    expect(saga.next().value).toEqual(
      put({ type: 'SET_HISTORY_INITIAL_STATE' })
    )

    expect(saga.next().value).toEqual(
      put({ type: 'SET_STASH_INITIAL_STATE' })
    )

    expect(saga.next().value).toEqual(
      put({ type: 'SET_PORTFOLIO_CARDS_INITIAL_STATE' })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchClearAllCardLists()

    expect(watcher.next().value).toEqual(
      takeEvery('CLEAR_ALL_CARD_LISTS', clearAllCardLists)
    )
  })
})
