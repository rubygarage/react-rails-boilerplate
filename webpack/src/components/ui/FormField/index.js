import React from 'react'
import PropTypes from 'prop-types'

import styles from './form_field.css'

function FormField({ name, label, labelHint, children, className }) {
  if (label === undefined) {
    return (<div className={className}>{children}</div>)
  }

  return (
    <div className={className}>
      <label htmlFor={name} className={styles.label}>
        {label}
        <span className={styles['label-hint']}>{labelHint}</span>
      </label>
      {children}
    </div>
  )
}

{ /* return (
  <div className={className}>
    <label htmlFor={name} className={styles.label}>
      {label}
      <span className={styles['label-hint']}>{labelHint}</span>
    </label>
    {children}
    <Component id={name} name={name} placeholder={placeholder} />
  </div>
) */ }

FormField.propTypes = {
  children: PropTypes.element,
  name: PropTypes.string,
  label: PropTypes.string,
  labelHint: PropTypes.string,
  className: PropTypes.string
}

export default FormField
