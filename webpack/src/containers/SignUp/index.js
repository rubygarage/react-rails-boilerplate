import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import validate from './validate'
import submit from './submit'

import SignUpComponent from 'components/SignUp'

class SignUpForm extends Component {
  render() {
    const props = {
      ...this.props,
      submitHandler: submit
    }

    return (
      <SignUpComponent {...props} />
    )
  }
}

export default injectIntl(reduxForm({
  form: 'signUp',
  validate
})(SignUpForm))
