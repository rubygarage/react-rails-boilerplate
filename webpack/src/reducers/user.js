import { GET_USER, UPDATE_USER, REQUEST, SUCCESS, ERROR } from 'constants/actions'

const initialState = {
  loading: false,
  userId: undefined
}

export default function user(state = initialState, action) {
  const { type, results } = action

  switch (type) {
    case GET_USER + REQUEST: return { ...initialState, loading: true }
    case GET_USER + SUCCESS: {
      return {
        ...state,
        loading: false,
        userId: results.users[0]
      }
    }
    case GET_USER + ERROR: return { ...state, loading: false }

    case UPDATE_USER + REQUEST: return { ...state, loading: true }
    case UPDATE_USER + SUCCESS: {
      return {
        ...state,
        loading: false,
        userId: results.users[0]
      }
    }
    case UPDATE_USER + ERROR: return { ...state, loading: false }

    default: return state
  }
}
