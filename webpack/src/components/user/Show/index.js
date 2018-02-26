import React from 'react';
import PropTypes from 'prop-types';
import Header from 'containers/Header';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

function User({ user, intl: { formatMessage } }) {
  return (
    <main>
      <Header />
      <div className="jumbotron">
        <p className="lead"> <FormattedMessage id="user.title" /> </p>

        <p>
          <FormattedMessage id="user.username" /> {user.username}
        </p>
        <p>
          <FormattedMessage id="user.email" /> {user.email}
        </p>

        <p><FormattedMessage id="user.avatar" /></p>
        <p>
          {user.avatar
            ? <img src={user.avatarThumb} alt={formatMessage({ id: 'user.avatar_alt' })} className="avatarThumb" />
            : <FormattedMessage id="user.no_avatar" />
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
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),
};

export default User;
