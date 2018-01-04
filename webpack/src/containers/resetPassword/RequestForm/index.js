import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { injectIntl } from 'react-intl';
import { sendRestorePasswordEmail } from 'actions/resetPassword';

import Instructions from 'components/resetPassword/RequestForm/Instructions';
import ResetPasswordRequestFormComponent from 'components/resetPassword/RequestForm';

import validate from './validate';

export class ResetPasswordRequestForm extends Component {
  static propTypes = {
    sendRestorePasswordEmail: PropTypes.func.isRequired,
  }

  state = {
    resetRequestSubmitted: false,
  }

  submit = values => new Promise((resolve, reject) => {
    values ? this.props.sendRestorePasswordEmail(values, resolve, reject) : reject();
  }).then(() => {
    this.setState({ resetRequestSubmitted: true });
  }).catch((error) => {
    throw new SubmissionError({ _error: error.message });
  })

  render() {
    const props = { ...this.props, submitHandler: this.submit };
    const component = this.state.resetRequestSubmitted
      ? <Instructions />
      : <ResetPasswordRequestFormComponent {...props} />;
    return (component);
  }
}

const mapDispatchToProps = { sendRestorePasswordEmail };

export default connect(null, mapDispatchToProps)(injectIntl(reduxForm({
  form: 'resetPassword',
  validate,
})(ResetPasswordRequestForm)));
