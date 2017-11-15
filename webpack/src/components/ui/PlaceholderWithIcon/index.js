import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/ui/Icon'

function PlaceholderWithIcon({ iconName, className, text }) {
  return (
    <span>
      <Icon type={iconName} className={className} />
      {text}
    </span>
  )
}

PlaceholderWithIcon.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string,
  text: PropTypes.string
}

export default PlaceholderWithIcon
