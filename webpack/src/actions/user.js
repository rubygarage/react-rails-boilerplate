import { GET_USER, REQUEST } from 'constants/actions';

export default function getUser(id) {
  return { type: GET_USER + REQUEST, id };
}
