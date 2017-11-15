import moods from 'reducers/moods'

describe('Moods reducer', () => {
  it('has an initial state', () => {
    expect(moods(undefined, { type: 'unexpected' })).toEqual({
      list: [],
      loading: false
    })
  })

  it('can handle LOAD_MOODS_REQUEST', () => {
    expect(moods(undefined, { type: 'LOAD_MOODS_REQUEST' })).toEqual({
      list: [],
      loading: true
    })
  })

  it('can handle LOAD_MOODS_SUCCESS', () => {
    const results = {
      moods: [1, 2, 3]
    }

    expect(moods(undefined, { type: 'LOAD_MOODS_SUCCESS', results })).toEqual({
      list: [1, 2, 3],
      loading: false
    })
  })

  it('can handle LOAD_MOODS_ERROR', () => {
    expect(moods(undefined, { type: 'LOAD_MOODS_ERROR' })).toEqual({
      list: [],
      loading: false
    })
  })
})
