const response = {
  data: {
    id: '1',
    type: 'users',
    attributes: {
      email: 'leland.trantow@wintheisergorczany.name',
      provider: 'email',
      uid: 'leland.trantow@wintheisergorczany.name',
      username: 'v0o8c5r5z8',
      profileImageSmall: '/images/user_no_photo.jpg',
      profileImageBig: '/images/user_no_photo.jpg',
    },
    relationships: {
      role: {
        data: {
          id: '1',
          type: 'roles',
        },
      },
      roles: {
        data: [{
          id: '1',
          type: 'roles',
        }],
      },
      profileCard: {
        data: {
          id: '1',
          type: 'profileCards',
        },
      },
      karmaData: {
        data: {
          id: '1',
          type: 'karmaDatas',
        },
      },
    },
  },
  included: [{
    id: '1',
    type: 'roles',
    attributes: {
      name: 'free',
      title: 'Free',
    },
  },
  {
    id: '1',
    type: 'profileCards',
    attributes: {
      imageSmall: '/images/user_no_photo.jpg',
      imageBig: '/images/user_no_photo.jpg',
    },
    relationships: {
      profileData: {
        data: {
          id: '1',
          type: 'profileDatas',
        },
      },
      location: {
        data: {
          id: '1',
          type: 'locations',
        },
      },
    },
  },
  {
    id: '1',
    type: 'profileDatas',
    attributes: {
      fullname: 'v0o8c5r5z8',
    },
  },
  {
    id: '1',
    type: 'locations',
    attributes: {
      name: 'United Kingdom',
    },
    relationships: {
      country: {
        data: {
          id: '234',
          type: 'countries',
        },
      },
    },
  },
  {
    id: '234',
    type: 'countries',
    attributes: {
      alpha2Code: 'gb',
      name: 'United Kingdom',
    },
  },
  {
    id: '1',
    type: 'karmaDatas',
    attributes: {
      totalKarma: 20,
    },
  }],
  headers: { Date: new Date() },
};

export default response;
