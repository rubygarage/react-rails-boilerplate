import destroyAvatar from 'actions/destroyAvatar';

describe('destroyAvatar', () => {
  it('creates an action to destroy user avatar', () => {
    const id = 1;
    const userId = 1;
    const expectedAction = { type: 'DESTROY_AVATAR_REQUEST', userId, id };

    expect(destroyAvatar(userId, id)).toEqual(expectedAction);
  });
});
