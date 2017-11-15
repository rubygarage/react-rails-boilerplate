import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import classNames from 'classnames'
import MaskedInput from 'react-maskedinput'
import Icon from 'components/ui/Icon'

import styles from './input.css'

class InputWithIcon extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  field(props) {
    const {
      autoFocus,
      input,
      classWrap,
      className,
      placeholder,
      type,
      disableError,
      mask,
      maxLength,
      disabled,
      meta: { touched, error },
      onInput,
      icon
    } = props

    return (
      <div className={classNames(classWrap, { 'has-error': (touched && error && !disableError) })}>
        {mask ? (
          <div className="relative">
            <MaskedInput
              {...input}
              className={classNames('pl-30', className)}
              placeholder={placeholder}
              type={type}
              maxLength={maxLength}
              disabled={disabled}
              mask={mask}
            />
            <Icon type={icon} className={classNames(styles['input-icon'], 'font-20')} />
          </div>
        ) : (
          <div className="relative">
            <input
              {...input}
              autoFocus={autoFocus}
              className={classNames('pl-30', className)}
              placeholder={placeholder}
              type={type}
              maxLength={maxLength}
              disabled={disabled}
              onInput={onInput}
            />
            <Icon type={icon} className={classNames(styles['input-icon'], 'font-20')} />
          </div>
        )}
        { !disableError && touched && error && <p className="error">{error}</p> }
      </div>
    )
  }

  render() {
    return <Field {...this.props} component={this.field} className={classNames('input', this.props.className)} />
  }
}

export default InputWithIcon
