import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import classNames from 'classnames'

class TextArea extends Component {
  static propTypes = {
    name: PropTypes.string,
    classWrap: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string
  }

  field = ({ input, classWrap, className, placeholder, disableError, maxLength, disabled, meta: { touched, error } }) => (
    <div className={classNames(classWrap, { 'has-error': (touched && error && !disableError) })}>
      <textarea
        {...input}
        className={className}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
      />
      { !disableError && touched && error && <p className="error">{error}</p> }
    </div>
  )

  render() {
    const { name, classWrap, className, placeholder } = this.props

    return (
      <Field
        component={this.field}
        name={name}
        classWrap={classWrap}
        className={classNames('textarea', className)}
        placeholder={placeholder}
      />
    )
  }
}

export default TextArea
