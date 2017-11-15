export const portfolioCards = {
  data: [
    {
      id: '1293',
      type: 'cards',
      attributes: {
        mediaName: 'audio-card-1',
        cardName: 'audio card 1',
        text: '4co1g333qwwi8b7jogcxig6p8qqv5ru0mm7vx2fpmdxyt0u1u6r5km8c54oe',
        subtype: 'book',
        pinnedUsersCount: 0,
        pinned: false,
        liked: false,
        commentsCount: 0,
        likedUsersCount: 0,
        sharesCount: 0,
        createdAt: '2017-04-14T11:02:34.140Z',
        entityType: 'pages',
        kind: 'audio',
        accessibilityPlan: 'free',
        addedToQueListsCount: 0
      },
      relationships: {
        entity: {
          data: {
            id: '168',
            type: 'pages'
          }
        },
        era: {
          data: {
            id: '11',
            type: 'eras'
          }
        },
        moods: {
          data: [
            {
              id: '292',
              type: 'moods'
            },
            {
              id: '293',
              type: 'moods'
            }
          ]
        },
        tags: {
          data: [
            {
              id: '297',
              type: 'tags'
            },
            {
              id: '298',
              type: 'tags'
            }
          ]
        },
        audioData: {
          data: {
            id: '158',
            type: 'audioDatas'
          }
        },
        cardImage: {
          data: {
            id: '1117',
            type: 'cardImages'
          }
        }
      }
    }
  ],
  included: [
    {
      id: '168',
      type: 'pages',
      attributes: {
        mediaName: 'page-fintone-5',
        followersCount: 0
      },
      relationships: {
        karmaData: {
          data: {
            id: '650',
            type: 'karmaDatas'
          }
        },
        profileCard: {
          data: {
            id: '1292',
            type: 'profileCards'
          }
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
      id: '1292',
      type: 'profileCards',
      attributes: {
        imageSmall: '/user_no_photo.jpg',
        imageOriginal: '/user_no_photo.jpg',
        pinned: false,
        pinnedUsersCount: 0,
        mediaName: 'profile-card-alpha-7',
        entityId: 168,
        entityType: 'pages'
      },
      relationships: {
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
        }
      }
    },
    {
      id: '709',
      type: 'profileDatas',
      attributes: {
        fullname: 'Tobin Predovic',
        profileColor: 'blue'
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
    },
    {
      id: '11',
      type: 'eras',
      attributes: {
        name: 'era quod 1'
      }
    },
    {
      id: '292',
      type: 'moods',
      attributes: {
        name: 'mood tenetur 7'
      }
    },
    {
      id: '293',
      type: 'moods',
      attributes: {
        name: 'mood possimus 8'
      }
    },
    {
      id: '297',
      type: 'tags',
      attributes: {
        text: 'tag cumque 1'
      }
    },
    {
      id: '298',
      type: 'tags',
      attributes: {
        text: 'tag reiciendis 2'
      }
    },
    {
      id: '158',
      type: 'audioDatas',
      attributes: {
        soundcloudLink: null
      },
      relationships: {
        cardAudio: {
          data: {
            id: '1116',
            type: 'cardAudios'
          }
        }
      }
    },
    {
      id: '1116',
      type: 'cardAudios',
      attributes: {
        url: '/uploads/attachable/card_audio/file/1116/e8c09d71-8470-4497-9388-6b4ef240868a.mp3'
      }
    },
    {
      id: '1117',
      type: 'cardImages',
      attributes: {
        original: '/uploads/attachable/card_image/file/1117/3c36e798-d2eb-422f-9e2a-bbd122960505.jpg',
        hd: '/uploads/attachable/card_image/file/1117/hd_3c36e798-d2eb-422f-9e2a-bbd122960505.jpg',
        big: '/uploads/attachable/card_image/file/1117/big_3c36e798-d2eb-422f-9e2a-bbd122960505.jpg',
        medium: '/uploads/attachable/card_image/file/1117/medium_3c36e798-d2eb-422f-9e2a-bbd122960505.jpg',
        small: '/uploads/attachable/card_image/file/1117/small_3c36e798-d2eb-422f-9e2a-bbd122960505.jpg'
      }
    }
  ],
  links: {}
}
