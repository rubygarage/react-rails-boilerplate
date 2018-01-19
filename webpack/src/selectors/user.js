import { createSelector } from 'reselect';

export const getCurrentUserId = state => (
  state.signin.currentUser.users ? state.signin.currentUser.users[0] : null
);
const getUsers = state => state.entities.users || {};
const getUserId = (_, id) => id;
const getUsersAvatars = state => state.entities.avatars || {};

const getAvatar = userInfoSelector => createSelector(
  [userInfoSelector, getUsersAvatars],
  (user, avatars) => (avatars[user.avatar]),
);

const getUserWithAvatar = userInfoSelector => createSelector(
  [userInfoSelector, getAvatar(userInfoSelector)],
  (user, avatar) => {
    if (!avatar) { return user; }
    return { ...user, avatarThumb: avatar.thumbImage, avatarFull: avatar.originalImage };
  },
);

export const getCurrentUserInfo = createSelector(
  [getCurrentUserId, getUsers],
  (currentUserId, users) => {
    if (!currentUserId) { return {}; }

    return users[currentUserId];
  },
);

export const getUserInfo = createSelector(
  [getUserId, getUsers],
  (id, users) => (users[id] || {}),
);

export const getCurrentUser = getUserWithAvatar(getCurrentUserInfo);
export const getUser = getUserWithAvatar(getUserInfo);
