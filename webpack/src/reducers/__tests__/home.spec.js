import home from 'reducers/home'

describe('Home reducer', () => {
  it('has an initial state', () => {
    expect(home(undefined, { type: 'unexpected' })).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_HOME_CARDS_REQUEST', () => {
    const params = { page: 0 }

    expect(home(undefined, { type: 'GET_HOME_CARDS_REQUEST', params })).toEqual({
      cards: [],
      loading: true,
      page: 0,
      hasMore: true
    })
  })

  it('can handle GET_HOME_CARDS_SUCCESS', () => {
    const results = {
      cards: [1, 2, 3]
    }

    expect(home(undefined, { type: 'GET_HOME_CARDS_SUCCESS', results })).toEqual({
      cards: [1, 2, 3],
      loading: false,
      page: 1,
      hasMore: true
    })
  })

  it('can handle GET_HOME_CARDS_ERROR', () => {
    expect(home(undefined, { type: 'GET_HOME_CARDS_ERROR' })).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: false
    })
  })

  it('can handle SET_HOME_INITIAL_STATE', () => {
    const initialState = {
      cards: [1, 2, 3],
      loading: true,
      page: 1480,
      hasMore: false
    }

    const action = {
      type: 'SET_HOME_INITIAL_STATE'
    }

    expect(home(initialState, action)).toEqual({
      cards: [],
      loading: false,
      page: 0,
      hasMore: true
    })
  })
})
