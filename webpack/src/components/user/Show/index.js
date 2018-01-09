import React from 'react';
import PropTypes from 'prop-types';
import Header from 'containers/Header';

// TODO: Better/prettier presentation for User once avatar will be implemented
function User({ user }) {
  return (
    <main>
      <Header />
      <div className="jumbotron">
        <p className="lead"> This is User page </p>

        <p>
          Username: {user.username}
        </p>
        <p>
          Email: {user.email}
        </p>
      </div>
    </main>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default User;
