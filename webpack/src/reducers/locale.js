import { SET_LOCALE } from 'constants/actions';

import enLocale from 'translations/en.json';

const initialState = {
  locale: 'en',
  messages: enLocale,
};

export default function locale(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOCALE: {
      // add switch statement when you add another locale
      const messages = enLocale;

      return { ...state, locale: payload, messages };
    }

    default: return state;
  }
}
