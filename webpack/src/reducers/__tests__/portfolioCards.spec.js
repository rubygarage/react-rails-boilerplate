import portfolioCards from 'reducers/portfolioCards'

describe('Portfolio cards reducer', () => {
  it('has an initial state', () => {
    expect(portfolioCards(undefined, { type: 'unexpected' })).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_PORTFOLIO_CARDS_REQUEST', () => {
    const params = { username: 'username', page: 1 }

    expect(portfolioCards(undefined, { type: 'GET_PORTFOLIO_CARDS_REQUEST', params })).toEqual({
      cards: [],
      loading: true,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_PORTFOLIO_CARDS_SUCCESS without portfolio data in store', () => {
    const initialState = {
      cards: [],
      loading: false,
      page: 1,
      hasMore: true
    }

    const results = {
      cards: [1, 3, 5]
    }

    const action = {
      type: 'GET_PORTFOLIO_CARDS_SUCCESS', results
    }

    expect(portfolioCards(initialState, action)).toEqual({
      cards: [1, 3, 5],
      loading: false,
      page: 2,
      hasMore: true
    })
  })

  it('can handle GET_PORTFOLIO_CARDS_SUCCESS with portfolio data in store', () => {
    const initialState = {
      cards: [1, 3, 5],
      loading: false,
      page: 2,
      hasMore: true
    }

    const results = {
      cards: [6]
    }

    const action = {
      type: 'GET_PORTFOLIO_CARDS_SUCCESS', results
    }

    expect(portfolioCards(initialState, action)).toEqual({
      cards: [1, 3, 5, 6],
      loading: false,
      page: 3,
      hasMore: true
    })
  })

  it('can handle GET_PORTFOLIO_CARDS_BY_TYPE_REQUEST', () => {
    const initialState = {
      cards: [1, 3, 5],
      loading: false,
      page: 2,
      hasMore: true
    }

    const params = { username: 'username', page: 1 }

    const action = {
      type: 'GET_PORTFOLIO_CARDS_BY_TYPE_REQUEST', params
    }

    expect(portfolioCards(initialState, action)).toEqual({
      cards: [],
      loading: true,
      page: 1,
      hasMore: true
    })
  })

  it('can handle SET_PORTFOLIO_CARDS_INITIAL_STATE', () => {
    const initialState = {
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    }

    const action = {
      type: 'SET_PORTFOLIO_CARDS_INITIAL_STATE'
    }

    expect(portfolioCards(initialState, action)).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_PORTFOLIO_CARDS_ERROR', () => {
    const initialState = {
      cards: [1, 3, 5],
      loading: false,
      page: 1,
      hasMore: true
    }

    expect(portfolioCards(initialState, { type: 'GET_PORTFOLIO_CARDS_ERROR', username: 'some_username' })).toEqual({
      cards: [1, 3, 5],
      loading: false,
      page: 1,
      hasMore: true
    })
  })
})
