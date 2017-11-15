import React, { Component } from 'react'
import classNames from 'classnames'
import { Field } from 'redux-form'

import styles from './radiobutton.css'

class RadioButton extends Component {
  field = ({ input, text, className, align, web, children, responsive }) => (
    <label className={classNames('radio', className, { 'radio-bg-check': input.checked }, styles[align], styles[web], styles[responsive])}>
      <input {...input} type="radio" className={styles['radio-input']} />
      <span className={classNames(styles['radio-icon'], 'icon')} />
      <span className={classNames(styles['radio-text'])}>{text}</span>
      <div>{children}</div>
    </label>
  )

  render() {
    return <Field {...this.props} type="radio" component={this.field} />
  }
}

export default RadioButton
