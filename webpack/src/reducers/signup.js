import { SIGN_UP, REQUEST, SUCCESS, ERROR } from 'constants/actions'

const initialState = {
  results: {}
}

export default function signup(state = initialState, action) {
  const { type, results } = action

  switch (type) {
    case SIGN_UP + REQUEST: return { ...state, loading: true }
    case SIGN_UP + SUCCESS: return { ...state, results, loading: false }
    case SIGN_UP + ERROR: return { ...state, loading: false }
    default: return state
  }
}
