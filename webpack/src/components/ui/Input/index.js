import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import classNames from 'classnames'

class Input extends Component {
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
      maxLength,
      disabled,
      meta: { touched, error },
      onInput
    } = props

    return (
      <div className={classNames(classWrap, { 'has-error': (touched && error && !disableError) })}>
        <input
          {...input}
          autoFocus={autoFocus}
          className={className}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          disabled={disabled}
          onInput={onInput}
        />
        { !disableError && touched && error && <p className="error">{error}</p> }
      </div>
    )
  }

  render() {
    return <Field {...this.props} component={this.field} className={classNames('input', this.props.className)} />
  }
}

export default Input
