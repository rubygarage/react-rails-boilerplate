import React, { Component } from 'react'
import { Field } from 'redux-form'
import classNames from 'classnames'

import styles from './checkbox.css'

class CheckboxGroup extends Component {
  field = ({ input, className, meta: { touched, error }, options, align, web }) => {
    const { name, onChange, onBlur, onFocus, value: inputValue } = input

    const checkboxes = options.map(({ value, label }, index) => {
      const handleChange = (event) => {
        const arr = [...inputValue]
        if (event.target.checked) {
          arr.push(value)
        } else {
          arr.splice(arr.indexOf(value), 1)
        }
        onBlur(arr)

        return onChange(arr)
      }
      const isChecked = inputValue.includes(value)

      return (
        <label key={index} className={classNames(styles.checkbox, className, styles[web], styles[align])}>
          <input
            className={styles['checkbox-input']}
            type="checkbox"
            name={name}
            value={value}
            checked={isChecked}
            onChange={handleChange}
            onFocus={onFocus}
          />
          <span className={classNames(styles['checkbox-icon'], 'icon')} />
          <span className={styles['checkbox-text']}>{label}</span>
        </label>
      )
    })

    return (
      <div>
        <div className="flex flex-wrap">{checkboxes}</div>
        <div className="has-error">
          { touched && error && <p className="error-message">{error}</p> }
        </div>
      </div>
    )
  }

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />
  }
}

export default CheckboxGroup
