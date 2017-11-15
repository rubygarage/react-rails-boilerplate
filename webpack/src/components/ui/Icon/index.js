import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Icon({ type, className, onClick }) {
  return <i className={classNames('icon', type, className)} onClick={onClick} />
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default Icon
