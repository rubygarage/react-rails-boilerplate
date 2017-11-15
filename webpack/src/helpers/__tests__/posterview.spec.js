import { uriBuilder } from 'helpers/posterview'

describe('uriBuilder', () => {
  describe('with undefined params', () => {
    const params = {}

    it('returns 404 uri', () => {
      expect(uriBuilder(params)).toEqual('/404')
    })
  })

  describe('with profile params', () => {
    const params = {
      source: 'profile',
      filter: {
        params: {
          'filter[username]': 'nime'
        }
      },
      mediaName: 'cardNime'
    }

    it('returns profile card uri', () => {
      expect(uriBuilder(params)).toEqual('/nime/cards/cardNime')
    })
  })

  describe('with other params', () => {
    const params = {
      source: 'market',
      mediaName: 'Silence-Best-Mp3'
    }

    it('returns related uri', () => {
      expect(uriBuilder(params)).toEqual('/market/cards/Silence-Best-Mp3')
    })
  })
})
