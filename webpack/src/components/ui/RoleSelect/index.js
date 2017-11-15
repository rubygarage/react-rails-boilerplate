import React, { Component } from 'react'
import classNames from 'classnames'
import ReactSelect from 'react-select'
import { Field } from 'redux-form'

class RoleSelect extends Component {
  field = ({
    input,
    name,
    placeholder,
    classWrap,
    className,
    getOptions,
    disabled,
    clearable,
    searchable,
    arrowText,
    meta: { touched, error }
  }) => (
    <div className={classNames(classWrap, { 'has-error': (touched && error) })}>
      <ReactSelect.Async
        {...input}
        name={name}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        clearable={clearable}
        searchable={searchable}
        arrowRenderer={() => (<span>{arrowText || '+'}</span>)}
        loadOptions={getOptions}
        onChange={(data) => input.onChange(data.value)}
        onBlur={() => input.onBlur(input.value)}
      />
      { touched && error && <p className="error">{error}</p> }
    </div>
  )

  render() {
    return <Field {...this.props} component={this.field} />
  }
}

export default RoleSelect
