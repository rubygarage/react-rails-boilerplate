import { signOut } from 'actions/signout'

describe('sign_out', () => {
  it('creates an action to sing_out', () =>{
    const expectedAction = { type: 'SIGN_OUT_REQUEST' }

    expect(signOut()).toEqual(expectedAction)
  })
})
