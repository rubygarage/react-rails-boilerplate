import React from 'react';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

import SignUpComponent from 'components/SignUp';

import validate from './validate';
import submit from './submit';

class SignUpForm extends React.PureComponent {
  render() {
    const props = {
      ...this.props,
      submitHandler: submit,
    };

    return (
      <SignUpComponent {...props} />
    );
  }
}

export default injectIntl(reduxForm({
  form: 'signUp',
  validate,
})(SignUpForm));
