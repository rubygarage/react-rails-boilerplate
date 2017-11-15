import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import submit from './submit'
import { validateToken } from 'sagas/resetPassword'

import ChangePasswordFormComponent from 'components/resetPassword/ChangePasswordForm'

export class ChangePasswordForm extends Component {
  render() {
    const props = {
      ...this.props,
      submitHandler: submit
    }

    return (
      <ChangePasswordFormComponent {...props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { reset_password_token } = ownProps.match.params

  return ({
    initialValues: { reset_token: reset_password_token }
  })
}

function preload(params, req, res) {
  const sagasToComplete = []
  const { reset_password_token } = params

  sagasToComplete.push([validateToken, reset_password_token, res]) // eslint-disable-line

  return sagasToComplete
}
ChangePasswordForm.preload = preload

export default connect(mapStateToProps)(reduxForm({
  form: 'changePassword',
  fieldsForValidation: ['password']
})(ChangePasswordForm))
