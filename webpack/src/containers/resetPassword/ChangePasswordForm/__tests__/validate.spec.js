import validate from '../validate';

describe('validate', () => {
  const state = {
    intl: {
      formatMessage: (...params) => (`intl.formatMessage(${JSON.stringify(params)})`),
    },
  };

  it('validates given values', () => {
    const values = { password: '', password_confirmation: '123' };

    expect(validate(values, state)).toEqual({
      password: 'intl.formatMessage([{"id":"validation.required_field"},{"field":"Password"}])',
      password_confirmation: 'intl.formatMessage([{"id":"validation.password_confirmation_does_not_match_the_password"}])',
    });
  });
});
