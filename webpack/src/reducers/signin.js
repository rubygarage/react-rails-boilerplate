import { SIGN_IN, REQUEST, SUCCESS, ERROR } from 'constants/actions';

const initialState = {
  currentUser: {},
  loading: false,
};

export default function signin(state = initialState, action) {
  const { type, currentUser } = action;

  switch (type) {
    case SIGN_IN + REQUEST: return { ...state, loading: true };
    case SIGN_IN + SUCCESS: return { ...state, currentUser, loading: false };
    case SIGN_IN + ERROR: return { ...state, loading: false };

    default: return state;
  }
}
