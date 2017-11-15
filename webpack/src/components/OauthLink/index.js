import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/ui/Icon'

function OauthLink({ type, onClick }) {
  return (
    <a href="" className="social-round-icon" onClick={onClick}>
      <Icon type={type} />
    </a>
  )
}

OauthLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}

export default OauthLink
