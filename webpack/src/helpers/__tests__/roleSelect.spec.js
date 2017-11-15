import { merchantToProviderLabelConverter } from 'helpers/roleSelect'

describe('merchantToProviderLabelConverter', () => {
  const params = { from: 'Merchant', to: 'Provider' }

  describe('with no arg', () => {
    it('returns empty array', () => {
      expect(merchantToProviderLabelConverter()).toEqual([])
    })
  })

  describe('array without merchant label', () => {
    const options = [
      { label: 'Hello' },
      { label: 'World' }
    ]

    it('returns same array', () => {
      expect(merchantToProviderLabelConverter(options)).toEqual(options)
    })
  })

  describe('array with merchant label', () => {
    const options = [
      { label: 'Merchant' },
      { label: 'World' }
    ]

    const expected = [
      { label: 'Provider' },
      { label: 'World' }
    ]

    it('replaces merchant to Provider', () => {
      expect(merchantToProviderLabelConverter(options, params)).toEqual(expected)
    })

    it('does not mutate original options', () => {
      merchantToProviderLabelConverter(options, params)
      expect(options[0].label).toEqual('Merchant')
    })
  })
})
