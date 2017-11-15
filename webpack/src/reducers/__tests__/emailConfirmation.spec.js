import emailConfirmation from 'reducers/emailConfirmation'

describe('Email confirmation reducer', () => {
  it('has an initial state', () => {
    expect(emailConfirmation(undefined, { type: 'unexpected' })).toEqual({
      loading: false
    })
  })

  it('can handle GET_EMAIL_CONFIRMATION_REQUEST', () => {
    expect(emailConfirmation(undefined, { type: 'GET_EMAIL_CONFIRMATION_REQUEST' })).toEqual({
      loading: true
    })
  })

  it('can handle GET_EMAIL_CONFIRMATION_SUCCESS', () => {
    expect(emailConfirmation(undefined, { type: 'GET_EMAIL_CONFIRMATION_SUCCESS' })).toEqual({
      loading: false
    })
  })

  it('can handle GET_EMAIL_CONFIRMATION_ERROR', () => {
    expect(emailConfirmation(undefined, { type: 'GET_EMAIL_CONFIRMATION_ERROR' })).toEqual({
      loading: false
    })
  })
})
