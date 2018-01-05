export const response = {
  data: {
    attributes: {
      email: 'dmitriy.grechukha@gmail.com',
      profileImageBig: '/uploads/attachable/profile_image/file/1367/big_4f9c3f52-3b40-49e0-8a74-43e0415181e3.jpg',
      profileImageSmall: '/uploads/attachable/profile_image/file/1367/small_4f9c3f52-3b40-49e0-8a74-43e0415181e3.jpg',
      provider: 'twitter',
      uid: '141283971',
      username: 'timlar'
    },
    id: '319',
    relationships: {
      profileCard: {
        data: {
          id: '1285',
          type: 'profileCards'
        }
      },
      roles: {
        data: [
          {
            id: '3',
            type: 'roles'
          }
        ]
      }
    },
    type: 'users'
  },
  included: [
    {
      attributes: {
        name: 'merchant',
        title: 'Merchant'
      },
      id: '3',
      type: 'roles'
    },
    {
      id: '1285',
      relationships: {
        profileData: {
          data: {
            id: '344',
            type: 'profileDatas'
          }
        }
      },
      type: 'profileCards'
    },
    {
      attributes: {
        fullname: 'timlar'
      },
      id: '344',
      type: 'profileDatas'
    }
  ]
}
