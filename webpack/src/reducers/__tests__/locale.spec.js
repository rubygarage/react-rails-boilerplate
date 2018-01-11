import locale from 'reducers/locale';

const fileEn = require('translations/en.json');

describe('Locale reducer', () => {
  it('has an initial state', () => {
    expect(locale(undefined, { type: 'unexpected' })).toEqual({
      locale: 'en',
      messages: fileEn,
    });
  });
});
