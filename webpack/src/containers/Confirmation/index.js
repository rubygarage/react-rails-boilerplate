import React from 'react';
import { connect } from 'react-redux';
import { emailConfirmation as emailConfirmationSaga } from 'sagas/emailConfirmation';
import ConfirmationComponent from 'components/Confirmation';

export class Confirmation extends React.PureComponent {
  render() {
    return (
      <ConfirmationComponent {...this.props} />
    );
  }
}

function preload(params, req, res) {
  const sagasToComplete = [];
  const confirmationToken = params.confirmation_token;

  sagasToComplete.push([emailConfirmationSaga, { confirmationToken }, res]) // eslint-disable-line

  return sagasToComplete;
}

Confirmation.preload = preload;

export default connect()(Confirmation);
