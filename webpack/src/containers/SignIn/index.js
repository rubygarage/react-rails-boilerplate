import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import submit from './submit'

import SignInComponent from 'components/SignIn'

export class SignIn extends Component {
  render() {
    const props = {
      ...this.props,
      submitHandler: submit
    }

    return (
      <SignInComponent {...props} />
    )
  }
}

export default reduxForm({
  form: 'signIn',
  fieldsForValidation: ['username', 'password']
})(SignIn)
