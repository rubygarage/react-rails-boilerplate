import history from 'reducers/history'

describe('History reducer', () => {
  it('has an initial state', () => {
    expect(history(undefined, { type: 'unexpected' })).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_HISTORY_CARDS_REQUEST', () => {
    const params = { page: 0 }

    expect(history(undefined, { type: 'GET_HISTORY_CARDS_REQUEST', params })).toEqual({
      cards: [],
      loading: true,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_HISTORY_CARDS_SUCCESS', () => {
    const results = {
      cards: [1, 2, 3]
    }

    expect(history(undefined, { type: 'GET_HISTORY_CARDS_SUCCESS', results })).toEqual({
      cards: [1, 2, 3],
      loading: false,
      page: 1,
      hasMore: true
    })
  })

  it('can handle GET_HISTORY_CARDS_ERROR', () => {
    expect(history(undefined, { type: 'GET_HISTORY_CARDS_ERROR' })).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: false
    })
  })

  it('can handle SET_HISTORY_INITIAL_STATE', () => {
    const initialState = {
      cards: [1, 2, 3],
      loading: true,
      page: 1480,
      hasMore: false
    }

    const action = {
      type: 'SET_HISTORY_INITIAL_STATE'
    }

    expect(history(initialState, action)).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    })
  })
})
