import user from 'reducers/user';

describe('User reducer', () => {
  it('sets default state', () => {
    expect(user(undefined, {})).toEqual({
      userId: undefined,
      loading: false,
    });
  });

  it('sets loading: true on get request', () => {
    expect(user(undefined, { type: 'GET_USER_REQUEST' })).toEqual({
      userId: undefined,
      loading: true,
    });
  });

  it('sets loading: false and userId on get success', () => {
    expect(user(undefined, { type: 'GET_USER_SUCCESS', results: { users: [3, 4] } })).toEqual({
      userId: 3,
      loading: false,
    });
  });

  it('sets loading: false on get error', () => {
    expect(user(undefined, { type: 'GET_USER_ERROR' })).toEqual({
      userId: undefined,
      loading: false,
    });
  });


  it('sets loading: true on update request', () => {
    expect(user(undefined, { type: 'UPDATE_USER_REQUEST' })).toEqual({
      userId: undefined,
      loading: true,
    });
  });

  it('sets loading: false on update success', () => {
    expect(user(undefined, { type: 'UPDATE_USER_SUCCESS', results: { users: [3, 4] } })).toEqual({
      userId: 3,
      loading: false,
    });
  });

  it('sets loading: false on update error', () => {
    expect(user(undefined, { type: 'UPDATE_USER_ERROR' })).toEqual({
      userId: undefined,
      loading: false,
    });
  });
});


it('sets loading: true on destroy avatar request', () => {
  expect(user(undefined, { type: 'DESTROY_AVATAR_REQUEST' })).toEqual({
    loading: true,
  });
});

it('sets loading: false on destroy avatar success', () => {
  expect(user(undefined, { type: 'DESTROY_AVATAR_SUCCESS', results: { users: [3, 4] } })).toEqual({
    loading: false,
  });
});

it('sets loading: false on destroy avatar error', () => {
  expect(user(undefined, { type: 'DESTROY_AVATAR_ERROR' })).toEqual({
    loading: false,
  });
});
