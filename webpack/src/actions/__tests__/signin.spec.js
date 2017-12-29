import { signIn } from 'actions/signin'

describe('sign_in', () => {
  it('creates an action to sing_in', () =>{
    const expectedAction = { type: 'SIGN_IN_REQUEST' }

    expect(signIn()).toEqual(expectedAction)
  })
})
