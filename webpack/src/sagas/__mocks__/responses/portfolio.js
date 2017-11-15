export const portfolio = {
  data: {
    id: '1292',
    type: 'profileCards',
    attributes: {
      mediaName: 'profile-card-alpha-7',
      cardName: 'parsing-Biodex7',
      pinnedUsersCount: 0,
      pinned: false,
      entityType: 'pages',
      imageOriginal: '/user_no_photo.jpg',
      profileCardBackgroundOriginal: '/back.jpg'
    },
    relationships: {
      entity: {
        data: {
          id: '168',
          type: 'pages'
        }
      },
      profileData: {
        data: {
          id: '709',
          type: 'profileDatas'
        }
      },
      location: {
        data: {
          id: '836',
          type: 'locations'
        }
      },
      primaryCareer: {
        data: null
      }
    }
  },
  included: [
    {
      id: '168',
      type: 'pages',
      attributes: {
        mediaName: 'page-fintone-5',
        followersCount: 0,
        followed: false
      },
      relationships: {
        karmaData: {
          data: {
            id: '650',
            type: 'karmaDatas'
          }
        },
        pageType: {
          data: null
        }
      }
    },
    {
      id: '650',
      type: 'karmaDatas',
      attributes: {
        totalKarma: 20
      }
    },
    {
      id: '709',
      type: 'profileDatas',
      attributes: {
        fullname: 'Tobin Predovic',
        profileColor: 'blue',
        aboutMe: 'Voluptatem quos commodi ad. Qui deserunt corporis tenetur sint. In dignissimos et.'
      }
    },
    {
      id: '836',
      type: 'locations',
      attributes: {
        name: 'United States Minor Outlying Islands'
      },
      relationships: {
        country: {
          data: {
            id: '234',
            type: 'countries'
          }
        }
      }
    },
    {
      id: '234',
      type: 'countries',
      attributes: {
        alpha2Code: 'gb',
        name: 'United Kingdom'
      }
    }
  ]
}

export const page = {
  data: {
    id: '1',
    type: 'pages',
    attributes: {
      mediaName: 'chanelle-walter',
      ownerId: 1
    },
    relationships: {
      profileCard: {
        data: {
          id: '2',
          type: 'profileCards'
        }
      },
      karmaData: {
        data: {
          id: '1',
          type: 'karmaDatas'
        }
      }
    }
  },
  included: [
    {
      id: '2',
      type: 'profileCards',
      relationships: {
        profileData: {
          data: {
            id: '2',
            type: 'profileDatas'
          }
        },
        location: {
          data: {
            id: '2',
            type: 'locations'
          }
        }
      }
    },
    {
      id: '2',
      type: 'profileDatas',
      attributes: {
        fullname: 'Abigail Treutel Sr.',
        profileColor: 'black',
        aboutMe: 'Chuck Norris can write infinite recursion functions... and have them return.'
      }
    },
    {
      id: '2',
      type: 'locations',
      attributes: {
        name: 'South Coltonbury'
      },
      relationships: {
        country: {
          data: {
            id: '234',
            type: 'countries'
          }
        }
      }
    },
    {
      id: '234',
      type: 'countries',
      attributes: {
        alpha2Code: 'gb',
        name: 'United Kingdom'
      }
    },
    {
      id: '1',
      type: 'karmaDatas',
      attributes: {
        totalKarma: 0
      }
    }
  ]
}
