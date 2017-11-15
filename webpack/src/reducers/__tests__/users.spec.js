import users from 'reducers/users'

describe('Users reducer', () => {
  it('has an initial state', () => {
    expect(users(undefined, { type: 'unexpected' })).toEqual({
      list: [],
      loading: false,
      pages: []
    })
  })

  it('can handle LOAD_USER_PAGES_REQUEST', () => {
    expect(users(undefined, { type: 'LOAD_USER_PAGES_REQUEST' })).toEqual({
      list: [],
      loading: false,
      pages: []
    })
  })

  it('can handle LOAD_USER_PAGES_SUCCESS', () => {
    const results = {
      list: [],
      loading: false,
      pages: [1, 2, 3]
    }

    expect(users(undefined, { type: 'LOAD_USER_PAGES_SUCCESS', results })).toEqual({
      list: [],
      loading: false,
      pages: [1, 2, 3]
    })
  })

  it('can handle LOAD_USER_PAGES_ERROR', () => {
    expect(users(undefined, { type: 'LOAD_USER_PAGES_ERROR' })).toEqual({
      list: [],
      loading: false,
      pages: []
    })
  })

  describe('LOAD_USERS', () => {
    it('can handle LOAD_USERS_REQUEST', () => {
      expect(users(undefined, { type: 'LOAD_USERS_REQUEST' })).toEqual({
        list: [],
        loading: true,
        pages: []
      })
    })

    it('can handle LOAD_USERS_SUCCESS', () => {
      expect(users(undefined, { type: 'LOAD_USERS_SUCCESS', users: [1, 2, 3] })).toEqual({
        list: [1, 2, 3],
        loading: false,
        pages: []
      })
    })

    it('can handle LOAD_USERS_ERROR', () => {
      expect(users(undefined, { type: 'LOAD_USERS_ERROR' })).toEqual({
        list: [],
        loading: false,
        pages: []
      })
    })
  })

  describe('LOAD_USER', () => {
    it('can handle LOAD_USER_REQUEST', () => {
      expect(users(undefined, { type: 'LOAD_USER_REQUEST' })).toEqual({
        list: [],
        loading: true,
        pages: []
      })
    })

    it('can handle LOAD_USER_SUCCESS', () => {
      expect(users(undefined, { type: 'LOAD_USER_SUCCESS', users: [1] })).toEqual({
        list: [1],
        loading: false,
        pages: []
      })
    })

    it('can handle LOAD_USER_ERROR', () => {
      expect(users(undefined, { type: 'LOAD_USER_ERROR' })).toEqual({
        list: [],
        loading: false,
        pages: []
      })
    })
  })
})
