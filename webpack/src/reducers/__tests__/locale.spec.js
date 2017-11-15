import locale from 'reducers/locale'

describe('Locale reducer', () => {
  it('has an initial state', () => {
    expect(locale(undefined, { type: 'unexpected' })).toEqual({
      locale: 'en',
      messages: require('translations/en.json')
    })
  })
})
