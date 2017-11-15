import pages from 'reducers/pages'

describe('Pages reducer', () => {
  it('has an initial state', () => {
    expect(pages(undefined, { type: 'unexpected' })).toEqual({
      list: [],
      loading: false
    })
  })

  describe('LOAD_PAGE', () => {
    it('can handle LOAD_PAGE_REQUEST', () => {
      expect(pages(undefined, { type: 'LOAD_PAGE_REQUEST' })).toEqual({
        list: [],
        loading: true
      })
    })

    it('can handle LOAD_PAGE_SUCCESS', () => {
      expect(pages(undefined, { type: 'LOAD_PAGE_SUCCESS', pages: [1] })).toEqual({
        list: [1],
        loading: false
      })
    })

    it('can handle LOAD_PAGE_ERROR', () => {
      expect(pages(undefined, { type: 'LOAD_PAGE_ERROR' })).toEqual({
        list: [],
        loading: false
      })
    })
  })
})
