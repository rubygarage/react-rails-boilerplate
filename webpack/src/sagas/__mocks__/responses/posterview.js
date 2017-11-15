export const posterview = {
  data: {
    data: {
      id: '1805',
      type: 'cards',
      attributes: {
        mediaName: 'ffffuuuuuu-5',
        cardName: 'text card 20',
        text: 'xu3lndsyu12ugu2r6s5p12s4c0to8txr3xkd3gxf64dgwfu5kch0gk1j4kr9',
        subtype: 'Ebook',
        pinnedUsersCount: 0,
        pinned: false,
        liked: false,
        commentsCount: 5,
        commented: false,
        likedUsersCount: 0,
        sharesCount: 0,
        createdAt: '2017-04-21T09:52:18.667Z',
        entityType: 'users',
        kind: 'text'
      },
      relationships: {
        entity: {
          data: {
            id: '481',
            type: 'users'
          }
        },
        era: {
          data: null
        },
        moods: {
          data: [
            {
              id: '196',
              type: 'moods'
            },
            {
              id: '197',
              type: 'moods'
            },
            {
              id: '198',
              type: 'moods'
            }
          ]
        },
        tags: {
          data: [
            {
              id: '537',
              type: 'tags'
            },
            {
              id: '538',
              type: 'tags'
            },
            {
              id: '539',
              type: 'tags'
            }
          ]
        },
        cardImage: {
          data: {
            id: '1786',
            type: 'cardImages'
          }
        }
      }
    },
    included: [
      {
        id: '481',
        type: 'users',
        attributes: {
          username: '36idy39925',
          followersCount: 0,
          unitesCount: 0,
          followed: false
        },
        relationships: {
          karmaData: {
            data: {
              id: '494',
              type: 'karmaDatas'
            }
          },
          profileCard: {
            data: {
              id: '1804',
              type: 'profileCards'
            }
          }
        }
      },
      {
        id: '494',
        type: 'karmaDatas',
        attributes: {
          totalKarma: 20
        }
      },
      {
        id: '1804',
        type: 'profileCards',
        attributes: {
          imageSmall: '/user_no_photo.jpg',
          imageOriginal: '/user_no_photo.jpg',
          pinned: false,
          pinnedUsersCount: 1,
          mediaName: 'profile-card-cardguard-61',
          entityId: 481,
          entityType: 'users'
        },
        relationships: {
          profileData: {
            data: {
              id: '508',
              type: 'profileDatas'
            }
          },
          location: {
            data: {
              id: '488',
              type: 'locations'
            }
          }
        }
      },
      {
        id: '508',
        type: 'profileDatas',
        attributes: {
          fullname: '36idy39925',
          profileColor: 'ocean'
        }
      },
      {
        id: '488',
        type: 'locations',
        attributes: {
          name: 'United Kingdom'
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
        id: '196',
        type: 'moods',
        attributes: {
          name: 'mood quis 182'
        }
      },
      {
        id: '197',
        type: 'moods',
        attributes: {
          name: 'mood animi 183'
        }
      },
      {
        id: '198',
        type: 'moods',
        attributes: {
          name: 'mood nihil 184'
        }
      },
      {
        id: '537',
        type: 'tags',
        attributes: {
          text: 'tag quia 182'
        }
      },
      {
        id: '538',
        type: 'tags',
        attributes: {
          text: 'tag sit 183'
        }
      },
      {
        id: '539',
        type: 'tags',
        attributes: {
          text: 'tag magnam 184'
        }
      },
      {
        id: '1786',
        type: 'cardImages',
        attributes: {
          original: '/uploads/attachable/card_image/file/1786/5e764f87-7f9c-4360-a459-f6844eb99049.jpg',
          hd: '/uploads/attachable/card_image/file/1786/hd_5e764f87-7f9c-4360-a459-f6844eb99049.jpg',
          big: '/uploads/attachable/card_image/file/1786/big_5e764f87-7f9c-4360-a459-f6844eb99049.jpg',
          medium: '/uploads/attachable/card_image/file/1786/medium_5e764f87-7f9c-4360-a459-f6844eb99049.jpg',
          small: '/uploads/attachable/card_image/file/1786/small_5e764f87-7f9c-4360-a459-f6844eb99049.jpg'
        }
      }
    ]
  }
}
