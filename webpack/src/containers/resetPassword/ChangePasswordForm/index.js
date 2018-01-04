import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import ChangePasswordFormComponent from 'components/resetPassword/ChangePasswordForm';

import { validateToken } from 'sagas/resetPassword';
import submit from './submit';

export class ChangePasswordForm extends React.PureComponent {
  render() {
    const props = {
      ...this.props,
      submitHandler: submit,
    };

    return (
      <ChangePasswordFormComponent {...props} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const resetPasswordToken = ownProps.match.params.reset_password_token;

  return ({
    initialValues: { reset_token: resetPasswordToken },
  });
};

function preload(params, req, res) {
  const sagasToComplete = [];
  const resetPasswordToken = params.reset_password_token;

  sagasToComplete.push([validateToken, resetPasswordToken, res]) // eslint-disable-line

  return sagasToComplete;
}
ChangePasswordForm.preload = preload;

export default connect(mapStateToProps)(reduxForm({
  form: 'changePassword',
  fieldsForValidation: ['password'],
})(ChangePasswordForm));
