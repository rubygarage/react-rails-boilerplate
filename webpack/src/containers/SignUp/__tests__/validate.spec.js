import validate from '../validate';

describe('validate', () => {
  const state = {
    intl: {
      formatMessage: (...params) => (`intl.formatMessage(${JSON.stringify(params)})`),
    },
  };

  it('validates given values', () => {
    const values = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '123',
    };

    expect(validate(values, state)).toEqual({
      email: 'intl.formatMessage([{"id":"validation.required_field"},{"field":"Email"}])',
      password: 'intl.formatMessage([{"id":"validation.required_field"},{"field":"Password"}])',
      password_confirmation: 'intl.formatMessage([{"id":"validation.password_confirmation_does_not_match_the_password"}])',
      username: 'intl.formatMessage([{"id":"validation.required_field"},{"field":"Username"}])',
    });
  });
});
