import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import sendRestorePasswordEmail from 'actions/resetPassword';

import Instructions from 'components/resetPassword/RequestForm/Instructions';
import ResetPasswordRequestFormComponent from 'components/resetPassword/RequestForm';

import validate from './validate';
import submit from './submit';

export class ResetPasswordRequestForm extends Component {
  static propTypes = {
    sendRestorePasswordEmail: PropTypes.func.isRequired,
  }

  state = {
    resetRequestSubmitted: false,
  }

  setResetRequestSubmitted = (value) => {
    this.setState({ resetRequestSubmitted: value });
  };

  submitAndHandleStateChange = (values, dispatch, props) => {
    submit(values, dispatch, { ...props, setResetRequestSubmitted: this.setResetRequestSubmitted });
  }

  render() {
    const props = { ...this.props, submitHandler: this.submitAndHandleStateChange };
    const component = this.state.resetRequestSubmitted
      ? <Instructions />
      : <ResetPasswordRequestFormComponent {...props} />;
    return (component);
  }
}

const mapDispatchToProps = { sendRestorePasswordEmail };

export default connect(null, mapDispatchToProps)(injectIntl(reduxForm({
  form: 'resetPassword',
  fieldsForValidation: ['email'],
  validate,
})(ResetPasswordRequestForm)));
