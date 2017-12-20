import {
  getCurrentUser,
  getUser
} from 'selectors/user'

describe('User selector', () => {
  const state = {
    entities: {
      users: {
        1: {
          id: '1',
          type: 'users'
        }
      }
    },
    signin: { currentUser: { users: [1] } }
  }

  describe('getCurrentUser', () => {
    const { users, roles } = state.entities
    const expectedData = {
      ...users[1]
    }

    expect(getCurrentUser(state)).toEqual(expectedData)
  })
})
