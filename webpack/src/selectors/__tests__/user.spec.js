import { getCurrentUser } from 'selectors/user';

describe('User selector', () => {
  const state = {
    entities: {
      users: {
        1: {
          id: '1',
          type: 'users',
        },
      },
    },
    signin: { currentUser: { users: [1] } },
  };

  describe('getCurrentUser', () => {
    const { users } = state.entities;
    const expectedData = {
      ...users[1],
    };

    it('get user state', () => {
      expect(getCurrentUser(state)).toEqual(expectedData);
    });
  });
});
