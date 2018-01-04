import signup from 'reducers/signup'

describe('Signup reducer', () => {
  it('sets loading: true on sign up request', () => {
    expect(signup(undefined, { type: 'SIGN_UP_REQUEST' })).toEqual({
      results: {},
      loading: true
    })
  })

  it('sets loading: false on sign up success', () => {
    expect(signup(undefined, { type: 'SIGN_UP_SUCCESS', results: {} })).toEqual({
      results: {},
      loading: false
    })
  })

  it('sets loading: false on sign up error', () => {
    expect(signup(undefined, { type: 'SIGN_UP_ERROR' })).toEqual({
      results: {},
      loading: false
    })
  })
})
