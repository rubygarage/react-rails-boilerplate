import React, { Component } from 'react'
import classNames from 'classnames'
import { Field } from 'redux-form'

import styles from './colored.css'

class ColoredRadioButton extends Component {
  field = ({ input, className }) => (
    <label className={classNames('radio', className, { [styles['radio-checked']]: input.checked })}>
      <input {...input} type="radio" className={classNames(styles['radio-input'])} />
      <span className={classNames(styles['radio-icon'], 'icon')} />
    </label>
  )

  render() {
    return <Field {...this.props} type="radio" component={this.field} />
  }
}

export default ColoredRadioButton
