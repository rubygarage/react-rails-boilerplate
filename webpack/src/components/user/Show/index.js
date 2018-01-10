import React from 'react'
import PropTypes from 'prop-types'
import Header from 'containers/Header'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

// TODO: Better/prettier presentation for User once avatar will be implemented
function User({ user, currentUserEditProfileLink }) {
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
        <p>
          <Link className="btn btn-primary" to={currentUserEditProfileLink}>
            <FormattedMessage id="user.edit_profile" />
          </Link>
        </p>
      </div>
    </main>
  )
}

User.propTypes = {
  user: PropTypes.object,
  currentUserEditProfileLink: PropTypes.string
}

export default User
