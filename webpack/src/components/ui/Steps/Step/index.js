import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './step.css'

function Step({ active, completed }) {
  return <div className={classNames(styles.step, { [styles.active]: active }, { [styles.completed]: completed })} />
}

Step.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
}

export default Step
