import { GET_USER, REQUEST } from 'constants/actions'

export function getUser(id) {
  return { type: GET_USER + REQUEST, id }
}
