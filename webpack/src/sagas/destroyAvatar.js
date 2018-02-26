import { takeEvery, call, put } from 'redux-saga/effects';
import { DESTROY_AVATAR, REQUEST, SUCCESS, ERROR } from 'constants/actions';
import ApiClient from 'utils/apiClient';

export function* destroyAvatar({ userId, id }) {
  const apiClient = new ApiClient().buildClient();
  try {
    yield call(apiClient.delete, `/api/v1/users/${userId}/avatar`, userId);
    // nullify avatar and user avatar relation
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
    yield put({ type: DESTROY_AVATAR + SUCCESS, entities });
  } catch (error) {
    yield put({ type: DESTROY_AVATAR + ERROR, error });
  }
}

export default function* watchDestroyAvatar() {
  yield takeEvery(DESTROY_AVATAR + REQUEST, destroyAvatar);
}
