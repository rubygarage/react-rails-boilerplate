import market from 'reducers/market'

describe('Marker reducer', () => {
  it('has an initial state', () => {
    expect(market(undefined, { type: 'unexpected' })).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_MARKET_CARDS_REQUEST', () => {
    const params = { page: 0 }

    expect(market(undefined, { type: 'GET_MARKET_CARDS_REQUEST', params })).toEqual({
      cards: [],
      loading: true,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_MARKET_CARDS_SUCCESS', () => {
    const results = {
      cards: [1, 2, 3]
    }

    expect(market(undefined, { type: 'GET_MARKET_CARDS_SUCCESS', results })).toEqual({
      cards: [1, 2, 3],
      loading: false,
      page: 1,
      hasMore: true
    })
  })

  it('can handle GET_MARKET_CARDS_ERROR', () => {
    expect(market(undefined, { type: 'GET_MARKET_CARDS_ERROR' })).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: false
    })
  })

  it('can handle SET_MARKET_INITIAL_STATE', () => {
    const initialState = {
      cards: [1, 2, 3],
      loading: true,
      page: 777,
      hasMore: false
    }

    const action = {
      type: 'SET_MARKET_INITIAL_STATE'
    }

    expect(market(initialState, action)).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    })
  })
})
