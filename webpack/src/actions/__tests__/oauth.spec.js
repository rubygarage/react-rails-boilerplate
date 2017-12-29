import { oauthRequest } from 'actions/oauth'

describe('oauth', () => {
  it('creates an action to oauth', () =>{
    const expectedAction = { type: 'OAUTH_REQUEST' }

    expect(oauthRequest()).toEqual(expectedAction)
  })
})
