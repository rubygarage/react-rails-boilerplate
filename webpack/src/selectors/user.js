import { createSelector } from 'reselect';

export const getCurrentUserId = state => (
  state.signin.currentUser.users ? state.signin.currentUser.users[0] : null
);
const getUsers = state => state.entities.users || {};
const getUserId = (_, id) => id;

export const getCurrentUser = createSelector(
  [getCurrentUserId, getUsers],
  (currentUserId, users) => {
    if (!currentUserId) { return {}; }

    return users[currentUserId];
  },
);

export const getUser = createSelector(
  getUserId,
  getUsers,
  (id, users) => (users[id] || {}),
);
