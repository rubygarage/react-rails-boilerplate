import React from 'react';
import { FormattedMessage } from 'react-intl';

function ConfirmationInstructions() {
  return (
    <main className="container">
      <div className="jumbotron">
        <h1 className="display-3"> <FormattedMessage id="confirmation_instructions.thanks" /> </h1>
        <p className="lead"> <FormattedMessage id="confirmation_instructions.check_email" /> </p>

        <ul className="list-unstyled">
          <li> <FormattedMessage id="confirmation_instructions.help_header" /> </li>

          <ul>
            <li> <FormattedMessage id="confirmation_instructions.help_spam" /> </li>
            <li> <FormattedMessage id="confirmation_instructions.help_email" /> </li>
            <li> <FormattedMessage id="confirmation_instructions.help_support" /> </li>
          </ul>
        </ul>
      </div>
    </main>
  );
}

export default ConfirmationInstructions;
