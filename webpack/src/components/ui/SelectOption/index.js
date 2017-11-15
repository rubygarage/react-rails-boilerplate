import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/ui/Icon'

export function SelectOption({ children, className, isFocused, onFocus, onSelect, option, option: { title, icon } }) {
  const handleMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onSelect(option, event)
  }

  const handleMouseEnter = (event) => {
    onFocus(option, event)
  }

  const handleMouseMove = (event) => {
    if (isFocused) return

    onFocus(option, event)
  }

  return (
    <div
      className={className}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      title={title}
    >
      <div className="flex align-center">
        <Icon type={icon} className="font-20 mr-10" />
        <span className="select-value-text">{children}</span>
      </div>
    </div>
  )
}

SelectOption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isFocused: PropTypes.bool,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  option: PropTypes.object.isRequired
}

export default SelectOption
