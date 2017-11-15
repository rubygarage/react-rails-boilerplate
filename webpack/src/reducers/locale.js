import { SET_LOCALE } from 'constants/actions'

const initialState = {
  locale: 'en',
  messages: require('translations/en.json')
}

export default function locale(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_LOCALE: {
      const messages = require(`translations/${(payload || state.locale)}.json`)

      return { ...state, locale: payload, messages }
    }

    default: return state
  }
}
