import React from 'react'
import PropTypes from 'prop-types'
import Step from './Step'

import styles from './steps.css'

function Steps({ step }) {
  const steps = [...Array(5).keys()]

  return (
    <div className={styles.steps}>
      <div className={styles.divider} />
      {steps
        .map((item, index) => <Step key={index} active={step === index + 1} completed={step > index + 1} />)
        .reduce((accum, curr) => [accum, <div key={Math.random()} className={styles.divider} />, curr])}
      <div className={styles.divider} />
    </div>
  )
}

Steps.propTypes = {
  step: PropTypes.number
}

export default Steps
