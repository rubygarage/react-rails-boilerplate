import {
  getCurrentUser,
  getCurrentUserCountry,
  getCurrentUserLocation,
  getCurrentUserPaymentReminder,
  getCurrentUserProfileCard,
  getInvitersOptions,
  getStructuredUsers,
  getUser,
  getUserPrimaryCareer,
  getUserProfileCard,
  getUserProfileData,
  profiles,
  profilesOptions,
  structuredUser
} from 'selectors/user'

describe('User selector', () => {
  const state = {
    entities: {
      users: {
        1: {
          id: '1',
          type: 'users',
          profileCard: '1',
          profileImageSmall: 'url',
          role: '12',
          roles: [12],
          lastPaymentReminder: '3'
        }
      },
      pages: {
        1: { id: '1', type: 'pages', profileImageSmall: 'url', profileCard: '2', pageType: '1' }
      },
      pageTypes: {
        1: { id: '1', type: 'pageTypes', name: 'Space' }
      },
      profileCards: {
        1: { id: '1', type: 'profileCards', profileData: '1', location: '5', imageSmall: 'url' },
        2: { id: '2', type: 'profileCards', profileData: '2', entityId: '1', entityType: 'pages', imageSmall: 'url' }
      },
      profileDatas: {
        1: { id: '1', type: 'profileDatas', fullname: 'test user' },
        2: { id: '2', type: 'profileDatas', fullname: 'test page' }
      },
      roles: {
        12: { id: '12', type: 'roles', name: 'subscriber', amount: 1100 },
        13: { id: '12', type: 'roles', name: 'merchant', amount: 7325 }
      },
      locations: {
        5: { id: '5', type: 'locations', country: '15' }
      },
      countries: {
        15: { id: '15', type: 'countries' }
      },
      paymentReminders: {
        3: { id: '3', type: 'paymentReminders' },
        9: { id: '9', type: 'paymentReminders' }
      }
    },
    signin: { currentUser: { users: [1] } },
    users: { pages: [1] }
  }

  describe('profiles()', () => {
    it('returns current user and his pages', () => {
      const expectedData = {
        user: state.entities.users[1],
        pages: [state.entities.pages[1]]
      }

      expect(profiles(state)).toEqual(expectedData)
    })

    it('returns current user without pages', () => {
      const stateWithoutPages = { ...state, users: { } }

      const expectedData = {
        user: state.entities.users[1],
        pages: []
      }

      expect(profiles(stateWithoutPages)).toEqual(expectedData)
    })

    it('returns current user and his pages with page type name', () => {
      expect(profiles(state).pages[0].pageTypeName).toEqual('Space')
    })

    it('returns current user and his pages without page type name', () => {
      const state = {
        entities: {
          users: {
            1: { id: '1', type: 'users' }
          },
          pages: {
            1: { id: '1', type: 'pages', profileImageSmall: 'url', profileCard: '2' }
          },
          pageTypes: {}
        },
        signin: { currentUser: { users: [1] } },
        users: { pages: [1] }
      }
      expect(profiles(state).pages[0].pageTypeName).toEqual(undefined)
    })
  })

  describe('profilesOptions()', () => {
    it('returns options for react-select', () => {
      const expectedData = [{
        value: JSON.stringify({ id: '1', type: 'users' }),
        label: 'test user',
        avatarUrl: 'url'
      }, {
        value: JSON.stringify({ id: '1', type: 'pages' }),
        label: 'test page',
        avatarUrl: 'url'
      }]

      expect(profilesOptions(state)).toEqual(expectedData)
    })
  })

  describe('getCurrentUser', () => {
    const { users, roles } = state.entities
    const expectedData = {
      ...users[1],
      role: roles[12],
      roles: [roles[12]]
    }

    expect(getCurrentUser(state)).toEqual(expectedData)
  })

  describe('getCurrentUserProfileCard', () => {
    it('returns current user profile card', () => {
      const { profileCards } = state.entities

      expect(getCurrentUserProfileCard(state)).toEqual(profileCards[1])
    })

    it('returns empty object', () => {
      const stateWithoutProfileCards = { ...state, entities: { ...state.entities, profileCards: undefined } }

      expect(getCurrentUserProfileCard(stateWithoutProfileCards)).toEqual({})
    })
  })

  describe('getCurrentUserLocation', () => {
    it('returns current user location', () => {
      const { locations } = state.entities

      expect(getCurrentUserLocation(state)).toEqual(locations[5])
    })

    it('returns empty object', () => {
      const stateWithoutLocations = { ...state, entities: { ...state.entities, locations: undefined } }

      expect(getCurrentUserLocation(stateWithoutLocations)).toEqual({})
    })
  })

  describe('getCurrentUserCountry', () => {
    it('returns current user country', () => {
      const { countries } = state.entities

      expect(getCurrentUserCountry(state)).toEqual(countries[15])
    })

    it('returns empty object', () => {
      const stateWithoutCountries = { ...state, entities: { ...state.entities, countries: undefined } }

      expect(getCurrentUserCountry(stateWithoutCountries)).toEqual({})
    })
  })

  describe('getCurrentUserPaymentReminder', () => {
    it('returns current user last payment reminder', () => {
      const { paymentReminders } = state.entities

      expect(getCurrentUserPaymentReminder(state)).toEqual(paymentReminders[3])
    })

    it('returns empty object', () => {
      const stateWithoutPaymentReminders = { ...state, entities: { ...state.entities, paymentReminders: undefined } }

      expect(getCurrentUserPaymentReminder(stateWithoutPaymentReminders)).toEqual({})
    })
  })

  describe('Structured user selectors', () => {
    describe('getUser', () => {
      const state = {
        entities: {
          users: {
            1: { id: '1', type: 'users' },
            3: { id: '1', type: 'users' }
          }
        }
      }

      it('returns user from entities by id', () => {
        expect(getUser(state, 3)).toEqual(state.entities.users[3])
      })

      it('returns empty object if no users found', () => {
        expect(getUser(state, 100)).toEqual({})
      })
    })

    describe('getUserProfileCard', () => {
      const state = {
        entities: {
          users: {
            1: { id: '1', type: 'users', profileCard: '10' },
            3: { id: '1', type: 'users' }
          },
          profileCards: {
            10: { id: '10', type: 'profileCards' }
          }
        }
      }

      it('returns user from entities by id', () => {
        expect(getUserProfileCard(state, 1)).toEqual(state.entities.profileCards[10])
      })

      it('returns empty object if no users found', () => {
        expect(getUserProfileCard(state, 100)).toEqual({})
      })
    })

    describe('getUserProfileData', () => {
      const state = {
        entities: {
          users: {
            1: { id: '1', type: 'users' },
            3: { id: '1', type: 'users', profileCard: '10' }
          },
          profileCards: {
            10: { id: '10', type: 'profileCards', profileData: '20' }
          },
          profileDatas: {
            20: { id: '20', fullname: 'SSSSSkkkkk' }
          }
        }
      }

      it('returns user from entities by id', () => {
        expect(getUserProfileData(state, 3)).toEqual(state.entities.profileDatas[20])
      })

      it('returns empty object if no users found', () => {
        expect(getUserProfileData(state, 100)).toEqual({})
      })
    })

    describe('getUserPrimaryCareer', () => {
      const state = {
        entities: {
          users: {
            1: { id: '1', type: 'users' },
            3: { id: '1', type: 'users', profileCard: '10' }
          },
          profileCards: {
            10: { id: '10', type: 'profileCards', primaryCareer: '13' }
          },
          careers: {
            13: { id: '13', name: 'Demon' }
          }
        }
      }

      it('returns user from entities by id', () => {
        expect(getUserPrimaryCareer(state, 3)).toEqual(state.entities.careers[13])
      })

      it('returns empty object if no users found', () => {
        expect(getUserPrimaryCareer(state, 111)).toEqual({})
      })
    })

    describe('structuredUser', () => {
      describe('with all data available', () => {
        const state = {
          entities: {
            users: {
              1: { id: '1', type: 'users' },
              3: { id: '1', type: 'users', profileCard: '10', karmaData: '666' }
            },
            profileCards: {
              10: { id: '10', type: 'profileCards', profileData: '20', primaryCareer: '13' },
              13: { id: '13', type: 'profileCards', profileData: '23' }
            },
            profileDatas: {
              20: { id: '20', fullname: 'SSSSSkkkkk' }
            },
            careers: {
              13: { id: '13', name: 'Demon' }
            },
            karmaDatas: {
              666: { id: '666', totalKarma: '0' }
            }
          }
        }

        it('returns structured user', () => {
          expect(structuredUser(state, 3)).toEqual({
            user: state.entities.users[3],
            profileCard: state.entities.profileCards[10],
            profileData: state.entities.profileDatas[20],
            primaryCareer: state.entities.careers[13],
            karmaData: state.entities.karmaDatas[666]
          })
        })
      })

      describe('when some data is missing', () => {
        const state = {
          entities: {
            users: {
              1: { id: '1', type: 'users' },
              3: { id: '1', type: 'users', profileCard: '10' }
            }
          }
        }

        it('returns empty objects for missing data', () => {
          expect(structuredUser(state, 1)).toEqual({
            user: state.entities.users[1],
            profileCard: {},
            profileData: {},
            primaryCareer: {},
            karmaData: {}
          })
        })
      })
    })

    describe('getStructuredUsers()', () => {
      const state = {
        entities: {
          users: {
            1: { id: '1', type: 'users' },
            2: { id: '2', type: 'users' },
            3: { id: '3', type: 'users' }
          }
        },
        inviters: {
          list: [1, 3]
        }
      }

      it('returns structured users', () => {
        expect(getStructuredUsers(state, [1, 3])).toEqual(
          [
            {
              user: state.entities.users[1],
              profileCard: {},
              profileData: {},
              primaryCareer: {},
              karmaData: {}
            },
            {
              user: state.entities.users[3],
              profileCard: {},
              profileData: {},
              primaryCareer: {},
              karmaData: {}
            }
          ]
        )
      })
    })

    describe('getInvitersOptions', () => {
      const state = {
        entities: {
          users: {
            1: { id: '1', type: 'users', profileImageSmall: 'url1', profileCard: '1' },
            2: { id: '2', type: 'users', profileImageSmall: 'url2', profileCard: '2' }
          },
          profileCards: {
            1: { id: '1', profileData: '1' },
            2: { id: '2', profileData: '2' }
          },
          profileDatas: {
            1: { id: '1', fullname: 'User One' },
            2: { id: '2', fullname: 'Use Two' }
          }
        },
        users: {
          list: [1, 2]
        }
      }

      it('returns inviters options', () => {
        expect(getInvitersOptions(state, state.users.list)).toEqual(
          [
            { label: 'User One', value: '1', avatarUrl: 'url1' },
            { label: 'Use Two', value: '2', avatarUrl: 'url2' }
          ]
        )
      })
    })
  })
})
