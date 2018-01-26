import { all, join, fork } from 'redux-saga/effects';
import watchDestroyAvatar from 'sagas/destroyAvatar';
import watchGetUser from 'sagas/user';
import watchSignIn from 'sagas/signin';
import watchSignOut from 'sagas/signout';
import watchSignUp from 'sagas/signup';
import { watchSendRestorePassword, watchUpdatePassword } from 'sagas/resetPassword';
import watchUpdateUser from 'sagas/updateUser';

export const waitAll = sagas => function* genTasks() {
  const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params));
  if (tasks.length) { yield join(...tasks); }
};

// NOTE! Please sort the lists above and below alphabetically
export default function* rootSaga() {
  yield all([
    watchDestroyAvatar(),
    watchGetUser(),
    watchSignIn(),
    watchSignOut(),
    watchSignUp(),
    watchSendRestorePassword(),
    watchUpdatePassword(),
    watchUpdateUser(),
  ]);
}
