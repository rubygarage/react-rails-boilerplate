import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import StepWithText from './StepWithText'

import styles from './styles.css'

function StepsWithText({ className, steps, step }) {
  const isActive = (index) => step === index + 1
  const isPassed = (index) => step > index + 1

  return (
    <div className={classNames(styles.menu, className)}>
      {steps.map((text, index) => (
        <StepWithText
          key={index}
          text={text}
          active={isActive(index)}
          passed={isPassed(index)}
        />
      ))}
    </div>
  )
}

StepsWithText.propTypes = {
  className: PropTypes.string,
  step: PropTypes.number,
  steps: PropTypes.array
}

export default StepsWithText
