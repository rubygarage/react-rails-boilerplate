import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

function Confirmation() {
  return (
    <main>
      <div className="jumbotron">
        <h4> <FormattedMessage id="email_confirmation.success" /> </h4>

        <Link to="/sign_in">
          <p>
            <FormattedMessage id="email_confirmation.login" />
          </p>
        </Link>
      </div>
    </main>
  );
}

export default Confirmation;
