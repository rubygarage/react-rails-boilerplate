import { createStore } from 'redux'
import reducer from 'reducers'

import rootReducer from 'reducers/index'

describe('rootReducer', () => {
  const state = createStore(reducer).getState()

  describe('can handle SIGN_OUT_SUCCESS', () => {
    const entities = { entities: { cards: { 1: { id: '1' }, 2: { id: '2' }, 3: { id: '3' } } } }
    const stateWithEntities = { ...state, ...entities }

    it('resets state', () => {
      expect(rootReducer(stateWithEntities, { type: 'SIGN_OUT_SUCCESS' })).toEqual({ ...state })
    })
  })

  describe('can handle CLEAR_ALL_CARD_LISTS', () => {
    const cards = { 1: { id: '1' }, 2: { id: '2' }, 3: { id: '3' } }

    const stateWithCards = {
      entities: { cards }
    }

    const expectedState = {
      ...state,
      entities: { cards: {} }
    }

    it('clears entitie cards', () => {
      expect(rootReducer({ ...state, ...stateWithCards }, { type: 'CLEAR_ALL_CARD_LISTS' })).toEqual({
        ...expectedState
      })
    })
  })
})
