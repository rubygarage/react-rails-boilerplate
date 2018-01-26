import { DESTROY_AVATAR, REQUEST } from 'constants/actions';

export default function destroyAvatar(userId, id) {
  return { type: DESTROY_AVATAR + REQUEST, userId, id };
}
