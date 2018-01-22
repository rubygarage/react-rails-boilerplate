import { normalize } from 'normalize-json-api';
import { takeEvery, call, put } from 'redux-saga/effects';
import watchOauth, { signIn, auth } from 'sagas/oauth';
import redirect from 'helpers/redirect';
import openPopup from 'utils/popup';
import { setTokenToStorage } from 'utils/tokens';
import oauthResponse from '../__mocks__/responses/oauth';

describe('signIn()', () => {
  const action = {
    type: 'OAUTH_REQUEST', provider: 'facebook',
  };
  const expectedResult = call(openPopup, `/omniauth/${action.provider}`, action.provider);

  it('calls signIn()', () => {
    const saga = signIn(action);

    expect(saga.next().value).toEqual(expectedResult);

    expect(saga.next().value).toEqual(call(auth, undefined));

    expect(saga.next().done).toBe(true);
  });

  it('failure', () => {
    const saga = signIn(action);
    const error = new Error('Unexpected Network Error');

    expect(saga.next().value).toEqual(expectedResult);

    expect(saga.throw(error).value).toEqual(put({ type: 'SIGN_IN_ERROR', error }));

    expect(saga.next().done).toBe(true);
  });

  it('watcher', () => {
    const watcher = watchOauth();

    expect(watcher.next().value).toEqual(takeEvery('OAUTH_REQUEST', signIn));

    expect(watcher.next().done).toBe(true);
  });
});

describe('auth()', () => {
  it('stores response and redirects to registration', () => {
    const user = {
      username: 'Evhenii Halenko',
      email: 'email@example.com',
      uid: '489413541398431',
    };
    const response = {
      newUser: 'true',
      userData: user,
      avatar: 'https://avatar_url',
    };
    const saga = auth(response);
    const expectedResult = put({ type: 'STORE_OAUTH_DATA', response: { ...response.userData } });

    expect(saga.next().value).toEqual(expectedResult);

    expect(saga.next().value).toEqual(call(redirect, '/sign_up'));

    expect(saga.next().done).toBe(true);
  });

  it('sign in as user', () => {
    const response = {
      newUser: 'false',
      userData: oauthResponse,
      headers: { authorization: 'Bearer eyJ0eXA.iOiJKV1.QiLCJh' },
    };
    const saga = auth(response);

    expect(saga.next().value).toEqual(call(setTokenToStorage, response.headers));

    expect(saga.next().value).toEqual(call(normalize, response.userData));

    const { entities, results } = normalize(response.userData);
    const expectedResult = put({ type: 'SIGN_IN_SUCCESS', entities, currentUser: results });

    expect(saga.next({ entities, results }).value).toEqual(expectedResult);

    expect(saga.next().value).toEqual(call(redirect, '/'));

    expect(saga.next().done).toBe(true);
  });
});
