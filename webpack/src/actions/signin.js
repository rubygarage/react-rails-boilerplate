import { SIGN_IN, REQUEST } from 'constants/actions'

export function signIn(values, resolve, reject) {
  return { type: SIGN_IN + REQUEST, values, resolve, reject }
}
