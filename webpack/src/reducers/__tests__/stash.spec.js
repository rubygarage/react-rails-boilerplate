import stash from 'reducers/stash'

describe('Stash reducer', () => {
  it('has an initial state', () => {
    expect(stash(undefined, { type: 'unexpected' })).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_STASH_CARDS_REQUEST', () => {
    const params = { page: 0 }

    expect(stash(undefined, { type: 'GET_STASH_CARDS_REQUEST', params })).toEqual({
      cards: [],
      loading: true,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_STASH_CARDS_SUCCESS', () => {
    const results = {
      cards: [1, 2, 3]
    }

    expect(stash(undefined, { type: 'GET_STASH_CARDS_SUCCESS', results })).toEqual({
      cards: [1, 2, 3],
      loading: false,
      page: 1,
      hasMore: true
    })
  })

  it('can handle GET_STASH_CARDS_ERROR', () => {
    expect(stash(undefined, { type: 'GET_STASH_CARDS_ERROR' })).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: false
    })
  })

  it('can handle SET_STASH_INITIAL_STATE', () => {
    const initialState = {
      cards: [1, 2, 3],
      loading: true,
      page: 14,
      hasMore: false
    }

    const action = {
      type: 'SET_STASH_INITIAL_STATE'
    }

    expect(stash(initialState, action)).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    })
  })
})
