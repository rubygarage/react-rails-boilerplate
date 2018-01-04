import watchSignOut, { signOut } from 'sagas/signout'
import { deleteTokenFromStorage } from 'utils/tokens'
import { takeEvery, call, put } from 'redux-saga/effects'
import { redirect } from 'helpers/redirect'

describe('signOut()', () => {

  it('success', () => {
    const saga = signOut()

    expect(saga.next().value).toEqual(
      call(deleteTokenFromStorage)
    )

    expect(saga.next().value).toEqual(
      put({ type: 'SIGN_OUT_SUCCESS' })
    )

    expect(saga.next().value).toEqual(
      call(redirect, '/')
    )

    expect(saga.next().done).toBe(true)
  })

  it('failure', () => {
    const saga = signOut()
    const error = { data: 'SignOut Error' }

    expect(saga.throw(error).value).toEqual(
      put({ type: 'SIGN_OUT_ERROR', error })
    )

    expect(saga.next().done).toBe(true)
  })

  it('watcher', () => {
    const watcher = watchSignOut()

    expect(watcher.next().value).toEqual(
      takeEvery('SIGN_OUT_REQUEST', signOut)
    )

    expect(watcher.next().done).toBe(true)
  })
})
