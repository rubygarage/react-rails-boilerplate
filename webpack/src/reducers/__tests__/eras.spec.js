import eras from 'reducers/eras'

describe('Eras reducer', () => {
  it('has an initial state', () => {
    expect(eras(undefined, { type: 'unexpected' })).toEqual({
      list: [],
      loading: false
    })
  })

  it('can handle LOAD_ERAS_REQUEST', () => {
    expect(eras(undefined, { type: 'LOAD_ERAS_REQUEST' })).toEqual({
      list: [],
      loading: true
    })
  })

  it('can handle LOAD_ERAS_SUCCESS', () => {
    const results = {
      eras: [1, 2, 3]
    }

    expect(eras(undefined, { type: 'LOAD_ERAS_SUCCESS', results })).toEqual({
      list: [1, 2, 3],
      loading: false
    })
  })

  it('can handle LOAD_ERAS_ERROR', () => {
    expect(eras(undefined, { type: 'LOAD_ERAS_ERROR' })).toEqual({
      list: [],
      loading: false
    })
  })
})
