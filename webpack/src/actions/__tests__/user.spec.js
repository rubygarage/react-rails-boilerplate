import getUser from 'actions/user';

describe('user', () => {
  it('creates an action to get user', () => {
    const id = 1;
    const expectedAction = { type: 'GET_USER_REQUEST', id };

    expect(getUser(id)).toEqual(expectedAction);
  });
});
