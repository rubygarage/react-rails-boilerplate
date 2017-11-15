export const getInviteeResponse = {
  data: {
    data: {
      id: '1',
      type: 'invitees',
      attributes: {
        username: 'vito'
      }
    }
  }
}

export const updateInviteeResponse = {
  data: {
    data: {
      attributes: {
        email: 'denis@rubygarage.org',
        profileImageBig: '/bit.jpg',
        profileImageSmall: '/small.jpg',
        provider: 'facebook',
        uid: '1234567890',
        username: 'denis'
      },
      id: '1',
      relationships: {
        profileCard: {
          data: {
            id: '1',
            type: 'profileCards'
          }
        },
        roles: {
          data: [
            {
              id: '4',
              type: 'roles'
            }
          ]
        }
      },
      type: 'users'
    }
  },
  included: [
    {
      attributes: {
        name: 'ambassador',
        title: 'Ambassador'
      },
      id: '4',
      type: 'roles'
    },
    {
      id: '1',
      relationships: {
        profileData: {
          data: {
            id: '1',
            type: 'profileDatas'
          }
        }
      },
      type: 'profileCards'
    },
    {
      attributes: {
        fullname: 'Denis Kostyrko'
      },
      id: '1',
      type: 'profileDatas'
    }
  ]
}
