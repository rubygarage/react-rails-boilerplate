import portfolio from 'reducers/portfolio'

describe('Portfolio card reducer', () => {
  it('has an initial state', () => {
    expect(portfolio(undefined, { type: 'unexpected' })).toEqual({
      profileCards: [],
      moods: [],
      skills: [],
      secondaryCareers: [],
      websites: [],
      socialNetworks: [],
      loading: false
    })
  })

  it('can handle GET_PORTFOLIO_CARD_REQUEST', () => {
    const initialState = {
      profileCards: [1],
      moods: [1, 2],
      skills: [4],
      secondaryCareers: [3],
      websites: [1],
      socialNetworks: [4, 5],
      loading: false
    }

    const params = { username: 'username' }

    expect(portfolio(initialState, { type: 'GET_PORTFOLIO_REQUEST', params })).toEqual({
      profileCards: [],
      moods: [],
      skills: [],
      secondaryCareers: [],
      websites: [],
      socialNetworks: [],
      loading: true
    })
  })

  it('can handle GET_PORTFOLIO_CARD_SUCCESS', () => {
    const results = {
      profileCards: [1]
    }

    expect(portfolio(undefined, { type: 'GET_PORTFOLIO_SUCCESS', results })).toEqual({
      profileCards: [1],
      moods: [],
      skills: [],
      secondaryCareers: [],
      websites: [],
      socialNetworks: [],
      loading: false
    })
  })

  it('can handle GET_PORTFOLIO_CARD_ERROR', () => {
    expect(portfolio(undefined, { type: 'GET_PORTFOLIO_ERROR' })).toEqual({
      profileCards: [],
      moods: [],
      skills: [],
      secondaryCareers: [],
      websites: [],
      socialNetworks: [],
      loading: false
    })
  })
})
