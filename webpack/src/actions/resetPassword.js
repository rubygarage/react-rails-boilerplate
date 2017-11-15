import { SEND_RESTORE_PASSWORD_EMAIL, REQUEST } from 'constants/actions'

export function sendRestorePasswordEmail(values, resolve, reject) {
  return { type: SEND_RESTORE_PASSWORD_EMAIL + REQUEST, values, resolve, reject }
}
