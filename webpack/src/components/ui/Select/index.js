import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactSelect from 'react-select'
import { Field } from 'redux-form'

function select(props) {
  const { input, classWrap, meta: { touched, error } } = props

  return (
    <div className={classNames(classWrap, { 'has-error': (touched && error) })}>
      <ReactSelect
        {...input}
        {...props}
        onChange={(data) => input.onChange(data.value)}
        onBlur={() => input.onBlur(input.value)}
      />
      { touched && error && <p className="error">{error}</p> }
    </div>
  )
}

select.propTypes = {
  classWrap: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
}

export function Select(props) {
  return (
    <Field {...props} component={select} />
  )
}

export default Select
