import oauth from 'reducers/oauth';

describe('Oauth reducer', () => {
  const oauthData = {
    uid: 1,
    username: 'name',
    email: 'mail@test.com',
    avatar: 'https://img_avatar_url',
  };

  it('sets new state from oauth response', () => {
    expect(oauth(undefined, { type: 'STORE_OAUTH_DATA', response: { oauthData } })).toEqual({
      oauthData,
    });
  });
});
