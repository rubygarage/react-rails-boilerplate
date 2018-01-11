import { SIGN_OUT, REQUEST } from 'constants/actions';

export default function signOut() {
  return { type: SIGN_OUT + REQUEST };
}
