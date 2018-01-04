import { OAUTH, REQUEST } from 'constants/actions';

export default function oauthRequest(provider) {
  return { type: OAUTH + REQUEST, provider };
}
