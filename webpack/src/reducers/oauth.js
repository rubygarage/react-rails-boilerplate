import { STORE_OAUTH_DATA } from 'constants/actions';

export default function oauth(state = {}, action) {
  const { type, response } = action;

  switch (type) {
    case STORE_OAUTH_DATA: return { ...state, ...response };

    default: return state;
  }
}
