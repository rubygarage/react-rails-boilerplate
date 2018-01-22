import { createStore } from 'redux';
import reducer from 'reducers';

import entities from 'reducers/entities';
import locale from 'reducers/locale';
import signin from 'reducers/signin';
import signup from 'reducers/signup';
import user from 'reducers/user';
import oauth from 'reducers/oauth';

describe('Combine Reducers', () => {
  const state = createStore(reducer).getState();

  it('Entities', () => {
    expect(state.entities).toEqual(entities(undefined, {}));
  });

  it('Locale', () => {
    expect(state.locale).toEqual(locale(undefined, {}));
  });

  it('Sign In', () => {
    expect(state.signin).toEqual(signin(undefined, {}));
  });

  it('Sign Up', () => {
    expect(state.signup).toEqual(signup(undefined, {}));
  });

  it('User', () => {
    expect(state.user).toEqual(user(undefined, {}));
  });

  it('Oauth', () => {
    expect(state.oauth).toEqual(oauth(undefined, {}));
  });
});
