import React from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import SelectOption from 'components/ui/SelectOption'
import SelectValue from 'components/ui/SelectValue'

export function SelectWithIcon({ className, onChange, options, placeholder, value }) {
  return (
    <ReactSelect
      className={className}
      name="select-with-icon"
      onChange={onChange}
      optionComponent={SelectOption}
      options={options}
      placeholder={placeholder}
      searchable={false}
      value={value}
      valueComponent={SelectValue}
    />
  )
}

SelectWithIcon.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string
  })),
  placeholder: PropTypes.string,
  value: PropTypes.string
}

export default SelectWithIcon
