import merge from 'lodash/merge'

const initialState = {}

export default function entities(state = initialState, action) {
  return (action.entities) ? merge({}, state, action.entities) : state
}
