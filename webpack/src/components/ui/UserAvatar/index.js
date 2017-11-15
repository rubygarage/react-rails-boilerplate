import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './user-avatar.css'

function UserAvatar({ size, className, bgimage }) {
  const classes = classNames(styles['user-avatar'], styles[size], className)

  return (
    <div className={classes} style={{ backgroundImage: `url(${bgimage})` }} />
  )
}

UserAvatar.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  bgimage: PropTypes.string
}

export default UserAvatar
