import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// import styles from 'assets/styles/style.css' // eslint-disable-line

class App extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        { children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default connect()(App);
