import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

function Header({ currentUser, currentUserProfileLink, handleSignOut }) {
  return (
    <nav className="navbar primary-color">
      <form className="form-inline justify-content-end">
        {currentUser.id ? (
          <div>
            <Link className="btn btn-primary mr-2" to={currentUserProfileLink}>
              <FormattedMessage id="header.my_profile" />
            </Link>
            <button className="btn btn-primary" onClick={handleSignOut} >
              <FormattedMessage id="header.logout" />
            </button>
          </div>
        ) : (
          <Link className="btn btn-primary" to="/sign_in">
            <FormattedMessage id="header.signin" />
          </Link>
        )}
      </form>
    </nav>
  );
}

Header.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }),
  currentUserProfileLink: PropTypes.string,
  handleSignOut: PropTypes.func.isRequired,
};

export default Header;
