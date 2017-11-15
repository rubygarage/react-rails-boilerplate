import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Icon from 'components/ui/Icon'

import styles from './follow.css'

function FollowButton({ followersCount, followed, onFollow }) {
  return (
    <a href="" className={classNames(styles['card-btn'], 'card-btn-theme', 'profile-action')} onClick={onFollow}>
      <Icon type="icon-user-star-circle" className="font-30 mr-5" />
      <span>
        <span className="font-14 font-medium">
          <FormattedMessage id={`portfolio.${followed ? 'unfollow' : 'follow'}`} />
        </span>
        <br />
        <span className="sidebar-subtext-color">
          {followersCount}
        </span>
      </span>
    </a>
  )
}

FollowButton.propTypes = {
  onFollow: PropTypes.func,
  followed: PropTypes.bool,
  followersCount: PropTypes.number
}

export default FollowButton
