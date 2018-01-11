import React from 'react';
import { FormattedMessage } from 'react-intl';
import Header from 'containers/Header';

function Landing() {
  return (
    <main>
      <Header />
      <div className="jumbotron">
        <h1 className="display-3"> <FormattedMessage id="landing.header" /> </h1>
        <p className="lead"> <FormattedMessage id="landing.lead_message" /> </p>

        <p> <FormattedMessage id="landing.note" /> </p>
      </div>
    </main>
  );
}

export default Landing;
