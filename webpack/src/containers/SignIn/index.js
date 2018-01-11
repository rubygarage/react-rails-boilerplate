import React from 'react';
import { reduxForm } from 'redux-form';

import SignInComponent from 'components/SignIn';

import submit from './submit';

export class SignIn extends React.PureComponent {
  render() {
    const props = {
      ...this.props,
      submitHandler: submit,
    };

    return (
      <SignInComponent {...props} />
    );
  }
}

export default reduxForm({
  form: 'signIn',
  fieldsForValidation: ['username', 'password'],
})(SignIn);
