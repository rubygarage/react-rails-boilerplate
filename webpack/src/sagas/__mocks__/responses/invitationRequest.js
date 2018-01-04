const invitation = {
  data: {
    id: '1',
    type: 'invitationRequests',
    attributes: {
      email: 'a@b.com',
      link: 'googleminus.com/www',
      mediaType: 'art',
    },
    relationships: {
      country: {
        data: { id: '1', type: 'countries' },
      },
      role: {
        data: { id: '1', type: 'roles' },
      },
    },
  },
  included: [
    {
      id: '1',
      type: 'countries',
      attributes: { alpha2Code: 'us' },
    },
    {
      id: '1',
      type: 'roles',
      attributes: {
        name: 'merchant',
        title: 'Merchant',
      },
    },
  ],
};

export default invitation;
