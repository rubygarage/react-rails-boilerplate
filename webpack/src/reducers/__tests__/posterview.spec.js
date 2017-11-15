import posterview from 'reducers/posterview'

describe('posterview reducer', () => {
  it('has an initial state', () => {
    expect(posterview(undefined, { type: 'unexpected' })).toEqual({
      loading: false,
      card: {}
    })
  })

  describe('GET_POSTERVIEW_CARD', () => {
    const card = { id: 7 }

    it('REQUEST', () => {

      expect(posterview({}, { type: 'GET_POSTERVIEW_CARD_REQUEST', card })).toEqual({
        loading: true
      })
    })

    it('SUCCESS', () => {
      expect(posterview({}, { type: 'GET_POSTERVIEW_CARD_SUCCESS', card })).toEqual({
        card,
        loading: false
      })
    })

    it('ERROR', () => {
      expect(posterview({}, { type: 'GET_POSTERVIEW_CARD_ERROR', card })).toEqual({
        loading: false
      })
    })
  })

  describe('GET_NEXT_CARD', () => {
    const card = { id: 7 }

    it('REQUEST', () => {

      expect(posterview({}, { type: 'GET_NEXT_CARD_REQUEST', card })).toEqual({
        loading: true
      })
    })

    it('SUCCESS', () => {
      expect(posterview({}, { type: 'GET_NEXT_CARD_SUCCESS', card })).toEqual({
        card,
        loading: false
      })
    })

    it('ERROR', () => {
      expect(posterview({}, { type: 'GET_NEXT_CARD_ERROR', card })).toEqual({
        loading: false
      })
    })
  })

  describe('GET_PREVIOUS_CARD', () => {
    const card = { id: 7 }

    it('REQUEST', () => {

      expect(posterview({}, { type: 'GET_PREVIOUS_CARD_REQUEST', card })).toEqual({
        loading: true
      })
    })

    it('SUCCESS', () => {
      expect(posterview({}, { type: 'GET_PREVIOUS_CARD_SUCCESS', card })).toEqual({
        card,
        loading: false
      })
    })

    it('ERROR', () => {
      expect(posterview({}, { type: 'GET_PREVIOUS_CARD_ERROR', card })).toEqual({
        loading: false
      })
    })
  })
})
