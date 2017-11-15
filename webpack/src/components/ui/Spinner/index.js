import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './spinner.css'

const allSizes = {
  large: '4rem',
  medium: '3rem',
  small: '2re'
}

function Spinner({ size, fullArea, color }) {
  return (
    <div className={classNames('text-center', styles[color], { [styles['spinner-area']]: fullArea })}>
      <span className={classNames(styles['spinner-icon'], 'icon', 'icon-logo')} style={{ fontSize: `${allSizes[size]}` }} />
    </div>
  )
}

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  fullArea: PropTypes.bool
}

export default Spinner
