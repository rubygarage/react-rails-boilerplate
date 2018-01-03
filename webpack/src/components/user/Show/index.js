import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Header from 'containers/Header'

// TODO: Better/prettier presentation for User once avatar will be implemented
function UserShow({ user, userEditUrl }) {
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
      <Link className="btn btn-primary mr-2" to={userEditUrl}>
        Edit
      </Link>
    </main>
  )
}

UserShow.propTypes = {
  user: PropTypes.object,
  userEditUrl: PropTypes.string
}

export default UserShow
