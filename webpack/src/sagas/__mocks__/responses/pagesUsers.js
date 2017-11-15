export const pagesUsers = {
  data: [
    {
      id: '1',
      type: 'pagesUsers',
      attributes: {
        pageId: '1'
      },
      relationships: {
        user: {
          data: {
            id: '2',
            type: 'users'
          }
        }
      }
    }
  ],
  included: [
    {
      id: '2',
      type: 'users',
      attributes: {
        username: '3rv07mdha1'
      },
      relationships: {
        profileCard: {
          data: {
            id: '3',
            type: 'profileCards'
          }
        }
      }
    },
    {
      id: '3',
      type: 'profileCards',
      attributes: {
        imageOriginal: '/assets/user_no_photo-a11d8c946af347afbf2d12a8093249dd.jpg'
      },
      relationships: {
        primaryCareer: {
          data: {
            id: '5',
            type: 'careers'
          }
        },
        profileData: {
          data: {
            id: '3',
            type: 'profileDatas'
          }
        }
      }
    },
    {
      id: '5',
      type: 'careers',
      attributes: {
        name: 'Career eum 5'
      }
    },
    {
      id: '3',
      type: 'profileDatas',
      attributes: {
        fullname: '3rv07mdha1'
      }
    }
  ]
}
