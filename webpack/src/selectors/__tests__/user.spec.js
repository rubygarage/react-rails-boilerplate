import { getCurrentUser } from 'selectors/user';
import { getOmniauthData } from 'selectors/user';

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
    oauth: { uid: '1385488138', provider: 'facebook' },
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

  describe('getOmniauthData', () => {
    const expectedData = {
      ...state.oauth,
    };

    it('get oauth data', () => {
      expect(getOmniauthData(state)).toEqual(expectedData);
    });
  });
});
