import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/ui/Icon'

export function SelectValue({ children, value: { icon, label } }) {
  return (
    <div className="Select-value" title={label}>
      <div className="Select-value-label flex align-center">
        <Icon type={icon} className="font-20 mr-10" />
        <span className="select-value-text">{children}</span>
      </div>
    </div>
  )
}

SelectValue.propTypes = {
  children: PropTypes.node,
  value: PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string
  }).isRequired
}

export default SelectValue
