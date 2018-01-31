import axios from 'axios';
import ApiClient from 'utils/apiClient';
import { takeEvery, call, put } from 'redux-saga/effects';
import watchDestroyAvatar, { destroyAvatar } from 'sagas/destroyAvatar';

describe('destroyAvatar()', () => {
  const userId = 1;
  const id = 7;
  let apiClient;

  beforeAll(() => {
    ApiClient.prototype._buildAxiosInstance = (req) => (axios) // eslint-disable-line
    apiClient = new ApiClient().buildClient();
  });

  it('success', () => {
    const saga = destroyAvatar({ userId, id });
    expect(saga.next().value).toEqual(call(apiClient.delete, `/api/v1/users/${userId}/avatar`, userId));
    const entities = {
      users: {
        [userId]: {
          avatar: null,
        },
      },
      avatars: {
        [id]: null,
      },
    };
    expect(saga.next().value).toEqual(put({
      type: 'DESTROY_AVATAR_SUCCESS',
      entities,
    }));
  });

  it('failure', () => {
    const saga = destroyAvatar({ userId, id });
    const error = { response: { data: 'Error' } };
    expect(saga.next().value).toEqual(call(apiClient.delete, `/api/v1/users/${userId}/avatar`, userId));
    expect(saga.throw(error).value).toEqual(put({ type: 'DESTROY_AVATAR_ERROR', error }));
  });
});

describe('watcher()', () => {
  it('gets user', () => {
    const watcher = watchDestroyAvatar();
    expect(watcher.next().value).toEqual(takeEvery('DESTROY_AVATAR_REQUEST', destroyAvatar));
    expect(watcher.next().done).toBe(true);
  });
});
