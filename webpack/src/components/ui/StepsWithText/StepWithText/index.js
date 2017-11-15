import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.css'

function StepWithText({ text, active, passed }) {
  return (
    <div className={classNames(styles.step, { [styles.active]: active, [styles.passed]: passed })}>
      <span className={styles['step-text']}>
        {text}
      </span>
    </div>
  )
}

StepWithText.propTypes = {
  active: PropTypes.bool,
  passed: PropTypes.bool,
  text: PropTypes.string
}

export default StepWithText
