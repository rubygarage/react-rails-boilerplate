import signin from 'reducers/signin';

describe('Signin reducer', () => {
  it('has an loading as initial state', () => {
    expect(signin(undefined, { type: 'unexpected' })).toEqual({
      currentUser: {},
      loading: false,
    });
  });

  it('sets state loading into true', () => {
    expect(signin(undefined, { type: 'SIGN_IN_REQUEST' })).toEqual({
      currentUser: {},
      loading: true,
    });
  });

  it('sets user and state', () => {
    expect(signin({ currentUser: { id: 1 } }, { type: 'SIGN_IN_SUCCESS', currentUser: { id: 3 } })).toEqual({
      currentUser: { id: 3 },
      loading: false,
    });
  });

  it('sets state loading into false', () => {
    expect(signin(undefined, { type: 'SIGN_IN_ERROR' })).toEqual({
      currentUser: {},
      loading: false,
    });
  });
});
