import React, { Component } from 'react'
import classNames from 'classnames'
import ReactSelect from 'react-select'
import { Field } from 'redux-form'

class MultiSelect extends Component {
  field = ({ input, name, options, placeholder, onOpen, isLoading, classWrap, className, meta: { touched, error } }) => (
    <div className={classNames(classWrap, { 'has-error': (touched && error) })}>
      <ReactSelect
        {...input}
        multi
        onOpen={onOpen}
        isLoading={isLoading}
        value={input.value}
        name={name}
        options={options}
        placeholder={placeholder}
        className={className}
        onChange={(values) => input.onChange(values.map((value) => value.value))}
        onBlur={() => input.onBlur(input.value)}
      />
      { touched && error && <p className="error">{error}</p> }
    </div>
  )

  render() {
    return <Field {...this.props} component={this.field} />
  }
}

export default MultiSelect
