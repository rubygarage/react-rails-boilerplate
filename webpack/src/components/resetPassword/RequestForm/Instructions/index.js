import React from 'react';
import { FormattedMessage } from 'react-intl';

function Instruction() {
  return (
    <main className="container">
      <div className="jumbotron">
        <h3> <FormattedMessage id="restore_password.header" /> </h3>
        <p className="lead"> <FormattedMessage id="restore_password.instructions" /> </p>
      </div>
    </main>
  );
}

export default Instruction;
