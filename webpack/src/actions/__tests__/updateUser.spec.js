import updateUser from 'actions/updateUser';

describe('update user', () => {
  it('creates an action to update user', () => {
    const values = 'value';
    const resolve = jest.fn();
    const reject = jest.fn();
    const expectedAction = {
      type: 'UPDATE_USER_REQUEST', values, resolve, reject,
    };

    expect(updateUser(values, resolve, reject)).toEqual(expectedAction);
  });
});
