import cardImage from 'reducers/cardImage'

describe('Card image reducer', () => {
  it('has an initial state', () => {
    expect(cardImage(undefined, { type: 'unexpected' })).toEqual({
      loading: false
    })
  })

  it('can handle GET_IMAGE_FROM_URL_REQUEST', () => {
    expect(cardImage(undefined, { type: 'GET_IMAGE_FROM_URL_REQUEST' })).toEqual({
      loading: true
    })
  })

  it('can handle GET_IMAGE_FROM_URL_SUCCESS', () => {
    expect(cardImage(undefined, { type: 'GET_IMAGE_FROM_URL_SUCCESS' })).toEqual({
      loading: false
    })
  })

  it('can handle GET_IMAGE_FROM_URL_ERROR', () => {
    expect(cardImage(undefined, { type: 'GET_IMAGE_FROM_URL_ERROR' })).toEqual({
      loading: false
    })
  })
})
