import user from 'reducers/user';

describe('User reducer', () => {
  it('sets default state', () => {
    expect(user(undefined, {})).toEqual({
      userId: undefined,
      loading: false,
    });
  });

  it('sets loding: true on get request', () => {
    expect(user(undefined, { type: 'GET_USER_REQUEST' })).toEqual({
      userId: undefined,
      loading: true,
    });
  });

  it('sets loding: false and userId on get success', () => {
    expect(user(undefined, { type: 'GET_USER_SUCCESS', results: { users: [3, 4] } })).toEqual({
      userId: 3,
      loading: false,
    });
  });


  it('sets loding: false on get error', () => {
    expect(user(undefined, { type: 'GET_USER_ERROR' })).toEqual({
      userId: undefined,
      loading: false,
    });
  });

  it('sets loding: true on update request', () => {
    expect(user(undefined, { type: 'UPDATE_USER_REQUEST' })).toEqual({
      userId: undefined,
      loading: true,
    });
  });

  it('sets loding: true on update request', () => {
    expect(user(undefined, { type: 'UPDATE_USER_SUCCESS', results: { users: [3, 4] } })).toEqual({
      userId: 3,
      loading: false,
    });
  });


  it('sets loding: true on update request', () => {
    expect(user(undefined, { type: 'UPDATE_USER_ERROR' })).toEqual({
      userId: undefined,
      loading: false,
    });
  });
});
