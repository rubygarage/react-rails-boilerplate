import { SIGN_OUT, REQUEST } from 'constants/actions'

export function signOut() {
  return { type: SIGN_OUT + REQUEST }
}
