import { UPDATE_USER, REQUEST } from 'constants/actions';

export default function getUser(values, resolve, reject) {
  return {
    type: UPDATE_USER + REQUEST, values, resolve, reject,
  };
}
