import { OAUTH, REQUEST } from 'constants/actions'

export function oauthRequest(provider) {
  return { type: OAUTH + REQUEST, provider }
}
