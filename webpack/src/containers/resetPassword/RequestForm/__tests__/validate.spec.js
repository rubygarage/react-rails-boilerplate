import validate from '../validate';

describe('validate', () => {
  it('validates given values', () => {
    const values = { email: 'invalid_email' };

    const state = {
      intl: {
        formatMessage: (...params) => (`intl.formatMessage(${JSON.stringify(params)})`),
      },
    };
    expect(validate(values, state)).toEqual({
      email: 'intl.formatMessage([{"id":"validation.invalid_email"}])',
    });
  });
});
