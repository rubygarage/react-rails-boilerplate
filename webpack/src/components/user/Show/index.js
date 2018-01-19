import React from 'react';
import PropTypes from 'prop-types';
import Header from 'containers/Header';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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

        <p>Avatar:</p>
        <p>
          {user.avatar
            ? <img src={user.avatarThumb} alt="User avatar" className="avatarThumb" />
            : 'none'
          }
        </p>
        <Link className="btn btn-primary" to={`/user/${user.id}/edit`}>
          <FormattedMessage id="user.edit_user_data" />
        </Link>
      </div>
    </main>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    avatarThumb: PropTypes.string,
    avatarFull: PropTypes.string,
  }),
};

export default User;
