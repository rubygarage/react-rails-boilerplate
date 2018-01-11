const validate = (values, state) => {
  const { formatMessage } = state.intl;
  const errors = {};

  if (!values.password) {
    errors.password = formatMessage({ id: 'validation.required_field' }, { field: 'Password' });
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = formatMessage({ id: 'validation.required_field' }, { field: 'Password confirmation' });
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation = formatMessage({ id: 'validation.password_confirmation_does_not_match_the_password' });
  }

  return errors;
};

export default validate;
