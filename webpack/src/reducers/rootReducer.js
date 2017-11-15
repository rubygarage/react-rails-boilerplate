import { SIGN_OUT, SUCCESS } from 'constants/actions'

const rootReducer = (reducers) => (state, action) => {
  switch (action.type) {
    case SIGN_OUT + SUCCESS: {
      state = undefined

      return reducers(state, action)
    }

    default: return reducers(state, action)
  }
}

export default rootReducer
