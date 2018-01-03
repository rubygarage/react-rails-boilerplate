import { GET_USER, UPDATE_USER, REQUEST } from 'constants/actions'

export function getUser(id) {
  console.log('id', id)

  return { type: GET_USER + REQUEST, id }
}

export function updateUser({ values, resolve, reject }) {
  return { type: UPDATE_USER + REQUEST, values, resolve, reject }
}
