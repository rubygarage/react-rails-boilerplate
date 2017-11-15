import React, { Component } from 'react'
import { Field } from 'redux-form'
import classNames from 'classnames'

import styles from './checkbox.css'

class Checkbox extends Component {
  field = ({ input, className, name, align, text }) => (
    <label className={classNames(styles.checkbox, className, styles[align])}>
      <input {...input} type="checkbox" className={styles['checkbox-input']} name={name} />
      <span className={classNames(styles['checkbox-icon'], 'icon')} />
      <span className={styles['checkbox-text']}>{text}</span>
    </label>
  )

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />
  }
}

export default Checkbox
