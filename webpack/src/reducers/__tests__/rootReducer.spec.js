import { createStore } from 'redux'
import reducer from 'reducers'

import rootReducer from 'reducers/index'

describe('rootReducer', () => {
  const state = createStore(reducer).getState()

  describe('can handle SIGN_OUT_SUCCESS', () => {
    const stateWithEntities = { ...state }

    it('resets state', () => {
      expect(rootReducer(stateWithEntities, { type: 'SIGN_OUT_SUCCESS' })).toEqual({ ...state })
    })
  })
})
